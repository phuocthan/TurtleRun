/****************************************************************************
Copyright (c) 2015-2016 Chukong Technologies Inc.
Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package org.cocos2dx.javascript;
import android.content.Context;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;

import android.app.Dialog;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.os.Bundle;

import org.cocos2dx.lib.Cocos2dxHelper;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.json.JSONObject;

import android.content.Intent;
import android.content.res.Configuration;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.WindowManager;
import android.view.KeyEvent;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import android.net.Uri;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.RequestConfiguration;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import java.util.Arrays;
import java.util.List;

public class AppActivity extends Cocos2dxActivity {
    public static Dialog loader_dialog;
    public static Context dpApp;
    private static AppActivity app = null;
    public static   AdView mAdView;
    private static InterstitialAd mInterstitialAd;
    private static LinearLayout bannerLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setFlags(
                WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED,
                WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED);
        // DO OTHER INITIALIZATION BELOW
        dpApp = AppActivity.this;//getApplication();
        app = this;
        SDKWrapper.getInstance().init(this);
        MobileAds.initialize(this, new OnInitializationCompleteListener() {
            @Override
            public void onInitializationComplete(InitializationStatus initializationStatus) {
                Log.d("THAN_DEV", "INIT FINISHED");
            }
        });

        List<String> testDeviceIds = Arrays.asList("9F9DE75E8B4EC4766837A42611CB1757");
        RequestConfiguration configuration =
                new RequestConfiguration.Builder().setTestDeviceIds(testDeviceIds).build();
        MobileAds.setRequestConfiguration(configuration);

        mAdView = new AdView(this);


        mAdView.setAdSize(AdSize.FLUID);

        // mAdView.setAdUnitId("ca-app-pub-3940256099942544/6300978111");
        mAdView.setAdUnitId("ca-app-pub-7656747978045245/4062066457");

        

        AdRequest adRequest = new AdRequest.Builder().build();
        bannerLayout = new LinearLayout(app);
        bannerLayout.setOrientation(LinearLayout.VERTICAL);
        bannerLayout.addView((mAdView));
            //    AdRequest adRequest = new AdRequest.Builder().build();
        mAdView.loadAd(adRequest);
        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.WRAP_CONTENT);
        params.gravity=Gravity.BOTTOM;
        app.addContentView(bannerLayout,params);
        bannerLayout.setVisibility(View.INVISIBLE);

        mAdView.setAdListener(new AdListener() {
            @Override
            public void onAdClicked() {
            // Code to be executed when the user clicks on an ad.
            Log.d("THAN_DEV", "onAdClicked");
            }

            @Override
            public void onAdClosed() {
            // Code to be executed when the user is about to return
            // to the app after tapping on an ad.
            Log.d("THAN_DEV", "onAdClosed");
            }

            @Override
            public void onAdFailedToLoad(LoadAdError adError) {
            // Code to be executed when an ad request fails.
            Log.d("THAN_DEV", "onAdFailedToLoad");
            }

            @Override
            public void onAdImpression() {
            // Code to be executed when an impression is recorded
            Log.d("THAN_DEV", "onAdImpression");
            // for an ad.
            }

            @Override
            public void onAdLoaded() {
            // Code to be executed when an ad finishes loading.
            Log.d("THAN_DEV", "onAdLoaded");
            bannerLayout.setVisibility(View.VISIBLE);
            }

            @Override
            public void onAdOpened() {
            // Code to be executed when an ad opens an overlay that
            Log.d("THAN_DEV", "onAdOpened");
            // covers the screen.
            }
    });

    }

    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);
        SDKWrapper.getInstance().setGLSurfaceView(glSurfaceView, this);

        return glSurfaceView;
    }

    @Override
    protected void onResume() {
        super.onResume();
        SDKWrapper.getInstance().onResume();

    }

    @Override
    protected void onPause() {
        super.onPause();
        SDKWrapper.getInstance().onPause();

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            return;
        }

        SDKWrapper.getInstance().onDestroy();

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        SDKWrapper.getInstance().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        SDKWrapper.getInstance().onNewIntent(intent);
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        SDKWrapper.getInstance().onRestart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        SDKWrapper.getInstance().onStop();
    }

    @Override
    public void onBackPressed() {
        SDKWrapper.getInstance().onBackPressed();
        //super.onBackPressed();
    }

    @Override
    public boolean onKeyDown(final int pKeyCode, final KeyEvent pKeyEvent) {
        return Cocos2dxGLSurfaceView.getInstance().onKeyDown(pKeyCode,pKeyEvent);
    }

    @Override
    public boolean onKeyUp(final int keyCode, KeyEvent event) {
        return Cocos2dxGLSurfaceView.getInstance().onKeyUp(keyCode,event);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        SDKWrapper.getInstance().onConfigurationChanged(newConfig);
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        SDKWrapper.getInstance().onRestoreInstanceState(savedInstanceState);
        super.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        SDKWrapper.getInstance().onSaveInstanceState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onStart() {
        SDKWrapper.getInstance().onStart();

        super.onStart();

    }

    public static void showBannerAd() {
        app.runOnUiThread(new Runnable() {
            @Override public void run() {
                AdRequest adRequest = new AdRequest.Builder().build();
              //  mAdView.loadAd(adRequest);


                InterstitialAd.load(app,"ca-app-pub-7656747978045245/8604232101", adRequest,
                // InterstitialAd.load(app,"ca-app-pub-3940256099942544/1033173712", adRequest,
                        new InterstitialAdLoadCallback() {
                            @Override
                            public void onAdLoaded(InterstitialAd interstitialAd) {
                                // The mInterstitialAd reference will be null until
                                // an ad is loaded.
                                mInterstitialAd = interstitialAd;
                                Log.d("THAN_DEV", " InterstitialAd onAdOpened");
                                if (mInterstitialAd != null) {
                                    mInterstitialAd.show(app);
                                    mInterstitialAd.setFullScreenContentCallback(new FullScreenContentCallback(){
                                        @Override
                                        public void onAdClicked() {
                                            // Called when a click is recorded for an ad.
                                            Log.d("THAN_DEV", "Ad was clicked.");
                                        }

                                        @Override
                                        public void onAdDismissedFullScreenContent() {
                                            // Called when ad is dismissed.
                                            // Set the ad reference to null so you don't show the ad a second time.
                                            Log.d("THAN_DEV", "Ad dismissed fullscreen content.");
                                            //mInterstitialAd = null;
                                        }

                                        @Override
                                        public void onAdFailedToShowFullScreenContent(AdError adError) {
                                            // Called when ad fails to show.
                                            Log.e("THAN_DEV", "Ad failed to show fullscreen content.");
                                            mInterstitialAd = null;
                                        }

                                        @Override
                                        public void onAdImpression() {
                                            // Called when an impression is recorded for an ad.
                                            Log.d("THAN_DEV", "Ad recorded an impression.");
                                        }

                                        @Override
                                        public void onAdShowedFullScreenContent() {
                                            // Called when ad is shown.
                                            Log.d("THAN_DEV", "Ad showed fullscreen content.");
                                        }
                                    });
                                } else {
                                    Log.d("TAG", "The interstitial ad wasn't ready yet.");
                                }
                            }

                            @Override
                            public void onAdFailedToLoad(LoadAdError loadAdError) {
                                // Handle the error
                                Log.d("THAN_DEV", loadAdError.toString());
                                mInterstitialAd = null;
                            }
                        });
            }

        });
    }
}
