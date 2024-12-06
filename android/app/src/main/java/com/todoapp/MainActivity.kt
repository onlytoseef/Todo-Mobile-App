package com.todoapp

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen
import com.facebook.react.ReactRootView
import com.facebook.soloader.SoLoader
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String {
        return "todoapp"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreen.show(this) 
        super.onCreate(savedInstanceState)
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : ReactActivityDelegate(this, mainComponentName) {
            override fun createRootView(): ReactRootView {
                return RNGestureHandlerEnabledRootView(this@MainActivity)
            }
        }
    }
}
