set ANDROID_SDK_ROOT=M:\AndroidStudioSDK
set PATH=%PATH%;M:\AndroidStudioSDK\tools\bin
set PATH=%PATH%;M:\AndroidStudioSDK\emulator
set PATH=%PATH%;M:\AndroidStudioSDK\platform-tools

adb devices

npx react-native run-android
