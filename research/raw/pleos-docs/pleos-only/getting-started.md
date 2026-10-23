> 출처: https://document.pleos.ai/docs/pleos-only/getting-started (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Pleos Connect 앱 개발 시작하기
이 문서는 Pleos Connect 앱 개발을 처음 시작하는 개발자를 위한 빠른 시작 가이드입니다.
Android Studio에서 프로젝트를 만들고 Pleos Connect Emulator를 실행한 다음, Vehicle SDK의 첫 번째 API를 호출합니다.

## 사전 준비​

- Android Studio

- Android SDK API 34

- Android 프로젝트의 `minSdk` API 28 이상

- Pleos Connect Emulator system image

## 1. Android 프로젝트 만들기​

Android Studio를 열고 File > New > New Project로 이동합니다.

- Templates에서 Car 또는 Automotive 카테고리를 선택합니다. Android Studio 버전에 따라 카테고리 이름이 다르게 표시될 수 있습니다.

- 기본 템플릿에서 Empty Activity를 선택합니다.

- 프로젝트 이름과 저장 위치를 지정합니다.

- 언어는 Kotlin을 선택하고 Minimum SDK는 Android API 28 이상으로 설정합니다.

- Finish를 클릭해 프로젝트를 생성합니다.

Android Studio가 필요한 종속 항목을 다운로드하고 프로젝트를 빌드합니다. 프로젝트가 생성되면 `app` 모듈이 정상적으로 빌드되는지 먼저 확인하세요.

## 2. Pleos Connect Emulator 설치 및 구성​

- Android Studio에서 Tools > SDK Manager > SDK Update Sites로 이동한 뒤 Add를 선택합니다.

- 아래 정보를 입력해 Pleos Connect system image 저장소를 추가합니다.

- Name: `Pleos Connect System Image`

- URL: 제공받은 Pleos Connect Emulator 다운로드 URL

- SDK Platforms에서 API 34의 Pleos Connect system image를 선택하고 설치한 뒤, Android Studio를 재시작합니다.

- Tools > Device Manager > Create device에서 Automotive를 선택하고 Pleos Connect 디바이스를 생성합니다.

- AVD 고급 설정에서 Boot option을 Cold boot, RAM을 4 GB로 설정한 다음, API 34 Pleos Connect system image를 선택해 생성합니다.

- Device Manager에서 생성한 AVD를 실행해 Pleos Connect Emulator를 시작합니다.

설치 화면, 버전별 메뉴 차이, 상세 옵션은 Pleos Connect Emulator 설치 및 실행을 참조하세요.

## 3. Vehicle SDK 가져오기​

### Maven 저장소 등록​

프로젝트의 `settings.gradle.kts`에 Pleos Maven 저장소를 추가합니다.

`dependencyResolutionManagement {

    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)

    repositories {

        google()

        mavenCentral()

        maven {

            url = uri("https://nexus-playground.pleos.ai/repository/maven-releases/")

        }

    }

}

`

### SDK 의존성 추가​

`app/build.gradle.kts`의 `dependencies` 블록에 Vehicle SDK를 추가합니다.

`dependencies {

    implementation("ai.pleos.playground:Vehicle:2.3.1")

}

`

이후 Sync Now를 선택합니다. 의존성을 찾지 못하면 Maven 저장소 접근 권한과 SDK 버전을 확인하세요. 자세한 내용은 Importing Vehicle SDK를 참조하세요.

## 4. 차량 권한 선언​

예제에서는 현재 도어 위치를 조회하므로 `CAR_DOORS` 권한을 선언합니다. `app/src/main/AndroidManifest.xml`에 추가합니다.

`<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="pleos.car.permission.CAR_DOORS" />

    <application

        ...>

        ...

    </application>

</manifest>

`

API별 권한은 Vehicle SDK permissions에서 확인하세요.

## 5. 첫 번째 API 호출​

`Vehicle` 객체를 생성하여 Vehicle service에 연결한 뒤, `getDoor()`로 도메인 객체를 얻은 후 도어 위치 조회 API를 호출합니다. 아래 예제는 Vehicle SDK API의 호출 흐름과 SDK 리소스 초기화/해제(`initialize()`, `release()`)만 보여주며, Android 앱 생명주기(`onCreate`, `onStart`, `onStop`, `onDestroy`)나 화면 구성 코드는 포함하지 않습니다.

`val vehicle = Vehicle(context)

vehicle.initialize()

val door = vehicle.getDoor()

door.getCurrentDoorPosition(

    area = DoorArea(DoorValue.ROW_1_LEFT),

    onComplete = { pos: Int? ->

        // Use the current door position.

    },

    onFailed = { e: Exception ->

        // Handle the Vehicle SDK error.

    }

)

// Do not call release() here.

// Call release() when the app no longer needs Vehicle SDK (for example, in onDestroy()).

`

`onComplete`와 `onFailed`는 비동기 콜백이며, `vehicle.release()`는 콜백 처리 완료 후 또는 SDK를 더 이상 사용하지 않는 앱 생명주기 시점(예: `onDestroy`)에서 호출하세요.

## 6. 에뮬레이터에서 확인​

- Pleos Connect Emulator가 완전히 부팅되었는지 확인합니다.

- Android Studio에서 앱 실행 대상 기기로 Pleos Connect Emulator를 선택합니다.

- Run을 눌러 앱을 빌드하고 설치합니다.

- 앱에서 현재 도어 위치 조회 결과가 처리되는지 확인합니다.

값을 읽지 못하면 다음 항목을 확인하세요.

- `minSdk`가 API 28 이상인지 확인합니다.

- `pleos.car.permission.CAR_DOORS`가 선언되어 있는지 확인합니다.

- SDK 의존성이 정상적으로 동기화되었는지 확인합니다.

- 에뮬레이터가 정상적으로 실행되었는지 확인합니다.

- `onFailed`에 전달된 예외 메시지를 확인합니다.

## 다음 단계​

첫 API 호출을 확인한 후에는 다음 순서로 앱의 설계, 개발, 테스트, 배포를 진행하세요.

- Pleos Connect 앱 계획 및 설계 가이드에서 차량용 앱의 화면, 주행 중 사용성, 성능 및 개인정보 보호 기준을 확인합니다.

- Pleos Connect 앱 개발 가이드에서 차량용 앱의 기능 구현 방법을 확인합니다.

- Pleos Connect SDK 및 API 문서에서 사용할 SDK를 선택하고 상세 API를 확인합니다.

- Vehicle SDK 권한, Capability API, Get API에서 실제 앱에 필요한 권한과 API 사용 방법을 확인합니다.

- Vehicle SDK Sample App 사용 가이드에서 Vehicle SDK를 사용하는 상세한 방법과 API 호출 흐름을 확인합니다.

- Pleos Connect Virtual Console 사용 가이드에 따라 차량 상태와 앱 연동을 테스트합니다.

- Pleos Connect 앱 등록 및 배포 가이드에 따라 앱을 검토하고 Pleos App Market에 제출합니다.
