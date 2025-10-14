---
title: Why variance exists in Typescript
published: 2025-10-14
description: ""
image: "./index.jpeg"
tags: []
category: Default
draft: false

---

https://github.com/microsoft/TypeScript/pull/48240

이 PR을 통해 클래스, 인터페이스, 타입 별칭의 타입 매개변수에 대한 선택적 선언 위치 변성 어노테이션(declaration site variance annotations)을 도입합니다. 어노테이션은 타입 매개변수 선언에서 타입 매개변수 이름 바로 앞에 `in` 그리고/또는 `out` 키워드 형태로 사용됩니다.

*   `out` 어노테이션은 타입 매개변수가 공변(covariant)임을 나타냅니다.
*   `in` 어노테이션은 타입 매개변수가 반공변(contravariant)임을 나타냅니다.
*   `in out` 어노테이션은 타입 매개변수가 불변(invariant)임을 나타냅니다.

일반적으로 타입 매개변수 변성은 단순히 제네릭 주체 타입에서 타입 매개변수가 어떻게 사용되는지의 함수입니다. 실제로 제네릭 타입 인스턴스화가 구조적으로 관련될 때 변성 어노테이션은 아무런 목적도 수행하지 않습니다. 이것이 TypeScript가 엄밀히 말해 변성 어노테이션을 필요로 하지 않는 이유입니다.

그러나 변성 어노테이션은 해당 제네릭 타입에 대해 원하는 타입 관계를 단언하는 데 유용합니다. 구체적으로, 제네릭 타입 G<T>와 `Sub`가 `Super`의 하위 타입인 두 개의 타입 인수 `Super`와 `Sub`가 주어졌을 때,

*   T가 공변이라면 (`out T`로 선언), G<Sub>는 G<Super>의 하위 타입입니다.
*   T가 반공변이라면 (`in T`로 선언), G<Super>는 G<Sub>의 하위 타입입니다.
*   T가 불변이라면 (`in out T`로 선언), G<Super>와 G<Sub> 어느 쪽도 다른 쪽의 하위 타입이 아닙니다.

직관적으로, 공변성은 타입 매개변수를 출력(읽기) 위치로 제한하고 반공변성은 타입 매개변수를 입력(쓰기) 위치로 제한합니다. 그래서 `in`과 `out` 수정자가 사용됩니다. 예를 들면 다음과 같습니다:

```ts
type Provider<out T> = () => T;
type Consumer<in T> = (x: T) => void;
type Mapper<in T, out U> = (x: T) => U;
type Processor<in out T> = (x: T) => T;
```

공변성 및 반공변성 어노테이션은 주체 제네릭 타입의 대표적인 인스턴스화를 구조적으로 관련시켜 확인합니다. 예를 들어, 다음 제네릭 타입에서 타입 매개변수 T는 입력 및 출력 위치 모두에서 사용되므로 T는 불변입니다. T를 공변으로 표시하려고 시도하면

```ts
type Foo<out T> = {
    x: T;
    f: (x: T) => void;
}
```

`out T`에서 다음 오류를 보고합니다:

```
'Foo<sub-T>' 타입은 변성 어노테이션에 의해 암시된 'Foo<super-T>' 타입에 할당할 수 없습니다.
  'f' 속성의 타입이 호환되지 않습니다.
    '(x: sub-T) => void' 타입은 '(x: super-T) => void' 타입에 할당할 수 없습니다.
      'x' 매개변수와 'x' 매개변수의 타입이 호환되지 않습니다.
        'super-T' 타입은 'sub-T' 타입에 할당할 수 없습니다.
```

마찬가지로 T를 반공변으로 표시하려고 시도하면

```ts
type Foo<in T> = {
    x: T;
    f: (x: T) => void;
}
```

`in T`에서 다음 오류를 보고합니다:

```
'Foo<super-T>' 타입은 변성 어노테이션에 의해 암시된 'Foo<sub-T>' 타입에 할당할 수 없습니다.
  'x' 속성의 타입이 호환되지 않습니다.
    'super-T' 타입은 'sub-T' 타입에 할당할 수 없습니다.
```

오류 상세 설명이 변성이 어디서 어떻게 위반되었는지를 어떻게 보여주는지 주목하십시오.

불변성 어노테이션 (`in out T`)은 결코 확인되지 않고 단순히 유지된다고 가정합니다. 따라서 타입 매개변수의 실제 사용이 공변 또는 반공변일 때에도 불변성을 단언하는 것이 가능합니다.

여러 인터페이스 선언이 병합되거나, 클래스 선언과 하나 이상의 인터페이스 선언이 병합될 때, 변성 어노테이션은 집계됩니다. 다음 예제에서

```
interface Bar<T> {
    // ...
}

interface Bar<out T> {
    // ...
}

interface Bar<in T> {
    // ...
}
```

T의 집계된 변성은 `in out`이므로, T는 불변으로 간주됩니다.

변성 어노테이션이 있으면 타입 검사기는 변성을 측정할 필요가 없습니다. 따라서 변성 어노테이션은 복잡하고 상호 의존적인 타입을 검사하는 성능을 향상시키는 데 도움이 될 수 있습니다. 특히, 타입 매개변수를 불변으로 표시하면 해당 타입 매개변수에 대한 측정이나 검사가 필요 없다는 것을 의미합니다.

또한, 변성 어노테이션은 여러 순환적으로 종속된 제네릭 타입에 대해 올바른 변성을 설정하는 데 도움이 될 수 있습니다. 구체적으로, 변성을 측정할 때 TypeScript는 제어 불가능한 재귀(runaway recursion)를 피하기 위해 구조적 탐색 공간을 제한합니다. 다음 예제에서

```ts
type Foo<T> = {
    x: T;
    f: Bar<T>;
}

type Bar<U> = (x: Baz<U[]>) => void;

type Baz<V> = {
    value: Foo<V[]>;
}

declare let foo1: Foo<unknown>;
declare let foo2: Foo<string>;

foo1 = foo2;  // 오류여야 하지만 그렇지 않음
foo2 = foo1;  // 오류
```

컴파일러는 T가 `Bar`에서의 변성 반전과 `Baz`에서의 순환 참조로 인해 실제로는 불변임에도 불구하고 공변으로 측정합니다. 컴파일러는 중첩된 순환 참조를 어떤 고정점에 도달할 때까지 구조적으로 계속 관련시킴으로써 이를 확인할 수 있지만, 이는 복잡한 시나리오에서는 기하급수적으로 비용이 많이 들고 실현 가능하지 않습니다. T에 `in out` 어노테이션을 추가하면 올바른 변성이 설정되고 예상된 오류가 발생합니다.

이 PR로 #1394와 #10717을 수정된 것으로 표시하지만, 구현된 기능이 해당 이슈에서 제안된 것과 정확히 일치하지는 않습니다.

#1394 수정.
#10717 수정.


---

With this PR we introduce optional declaration site variance annotations for type parameters of classes, interfaces and type aliases. Annotations take the form of an in and/or out keyword immediately preceding the type parameter name in a type parameter declaration.

- An out annotation indicates that a type parameter is covariant.
- An in annotation indicates that a type parameter is contravariant.
- An in out annotation indicates that a type parameter is invariant.

Generally, type parameter variance is simply a function of how a type parameter is used in its generic subject type. Indeed, when generic type instantiations are related structurally, variance annotations serve no purpose. This is why TypeScript strictly doesn't need variance annotations. However, variance annotations are useful to assert desired type relations of their subject generic types. Specifically, given a generic type G<T> and any two type arguments Super and Sub for which Sub is a subtype of Super,

- if T is covariant (declared as out T), G<Sub> is a subtype of G<Super>,
- if T is contravariant (declared as in T), G<Super> is a subtype of G<Sub>, and
- if T is invariant (declared as in out T), neither G<Super> nor G<Sub> is a subtype of the other.
Intuitively, covariance restricts a type parameter to output (read) positions and contravariance restricts a type parameter to input (write) positions--hence the in and out modifiers. For example:

```ts
type Provider<out T> = () => T;
type Consumer<in T> = (x: T) => void;
type Mapper<in T, out U> = (x: T) => U;
type Processor<in out T> = (x: T) => T;
Covariance and contravariance annotations are checked by structurally relating representative instantiations of their subject generic types. For example, in the following generic type, the type parameter T is used in both input and output positions and T is thus invariant. Attempting to mark T covariant

type Foo<out T> = {
    x: T;
    f: (x: T) => void;
}
```

reports the following error on out T:

```
Type 'Foo<sub-T>' is not assignable to type 'Foo<super-T>' as implied by variance annotation.
  Types of property 'f' are incompatible.
    Type '(x: sub-T) => void' is not assignable to type '(x: super-T) => void'.
      Types of parameters 'x' and 'x' are incompatible.
        Type 'super-T' is not assignable to type 'sub-T'.
```

Likewise, attempting to mark T contravariant

```ts
type Foo<in T> = {
    x: T;
    f: (x: T) => void;
}
```

reports the following error on in T:

```
Type 'Foo<super-T>' is not assignable to type 'Foo<sub-T>' as implied by variance annotation.
  Types of property 'x' are incompatible.
    Type 'super-T' is not assignable to type 'sub-T'.
```

Notice how the error elaborations reveal where and how variance is breached.

Invariance annotations (in out T) are never checked but simply assumed to hold. Thus, it is possible to assert invariance even when the actual usage of a type parameter is co- or contravariant.

When multiple interface declarations are merged, or when a class declaration and one or more interface declarations are merged, variance annotations are aggregated. In the example

```
interface Bar<T> {
    // ...
}

interface Bar<out T> {
    // ...
}

interface Bar<in T> {
    // ...
}
```

the aggregate variance of T is in out, and T is thus assumed to be invariant.

When variance annotations are present, the type checker doesn't need to measure variance. Thus, variance annotations can help improve the performance of checking complex and interdependent types. In particular, marking a type parameter invariant means that no measurement or checking is necessary for that type parameter.

In addition, variance annotation can help establish correct variance for multiple circularly dependent generic types. Specifically, when measuring variance, TypeScript limits the structural search space in order to avoid runaway recursion. In the example

```ts
type Foo<T> = {
    x: T;
    f: Bar<T>;
}

type Bar<U> = (x: Baz<U[]>) => void;

type Baz<V> = {
    value: Foo<V[]>;
}

declare let foo1: Foo<unknown>;
declare let foo2: Foo<string>;

foo1 = foo2;  // Should be an error but isn't
foo2 = foo1;  // Error
```

the compiler measures T to be covariant even though it is actually invariant due to variance reversal in Bar and the circular reference in Baz. The compiler could establish that by continuing to structurally relating nested circular references until some fixed point, but this gets exponentially expensive and isn't feasible in complex scenarios. Adding an in out annotation to T establishes the correct variance and produces the expected errors.

We're marking #1394 and #10717 fixed by this PR, although the feature implemented isn't exactly what is suggested in those issues.

Fixes #1394.
Fixes #10717.