package com.dog;

import com.facebook.react.ReactActivity;
import com.rnfs.RNFSPackage;

public class MainActivity extends ReactActivity {


  // @Override
  // protected void onCreate(Bundle savedInstanceState) {
  //   super.onCreate(savedInstanceState);
  //   mReactRootView = new ReactRootView(this);
 
  //   mReactInstanceManager = ReactInstanceManager.builder()
  //     .setApplication(getApplication())
  //     .setBundleAssetName("index.android.bundle")
  //     .setJSMainModuleName("index.android")
  //     .addPackage(new MainReactPackage())
  //     .addPackage(new RNFSPackage())      // <------- add package 
  //     .setUseDeveloperSupport(BuildConfig.DEBUG)
  //     .setInitialLifecycleState(LifecycleState.RESUMED)
  //     .build();
 
  //   mReactRootView.startReactApplication(mReactInstanceManager, "ExampleRN", null);
 
  //   setContentView(mReactRootView);
  // }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "dog";
  }
}
