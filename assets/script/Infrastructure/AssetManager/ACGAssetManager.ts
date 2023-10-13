/*
 * @Author: Abel Chan
 * @Date: 2020-06-24 00:50:03
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-14 23:52:27
 * @FilePath: \assets\script\Infrastructure\AssetManager\ACGAssetManager.ts
 * @description: 
 */

import { _decorator, AssetManager, Asset, resources, assetManager } from 'cc';
export default class ACGAssetManager {
     private static _bundleMap: Map<string, AssetManager.Bundle> = new Map();
     static preloadBundle(bundleName: string) {
          assetManager.loadBundle(bundleName, null, (err: Error, bundle: AssetManager.Bundle) => {
               if (!err) {
                    ACGAssetManager._bundleMap.set(bundleName, bundle);
               }
          });
     }

     //加载资源
     static loadRes(bundleName: string, url: string, type: typeof Asset, callback: (error: Error, resource: any) => void);
     static loadRes(bundleName: string, url: string[], type: typeof Asset, callback: (error: Error, resource: any) => void);
     static loadRes(bundleName: string, url: string | string[], type: typeof Asset, callback: (error: Error, resource: any) => void) {
          assetManager.bundles;
          let bundle = this.getBundle(bundleName);
          bundle.load(url, type, callback);
     }

     //加载一组资源
     static loadResArray(bundleName: string, url: string[], type: typeof Asset, callback: (error: Error, resource: any) => void) {
          ACGAssetManager.loadRes(bundleName, url, type, callback);
     }
     //同步获取资源
     static getRes(bundleName: string, url: string, type: typeof Asset): Asset {
          let bundle = this.getBundle(bundleName);
          return bundle.get(url, type);
     }
     //加载一个目录的资源
     static loadResDir(url: string, type: typeof Asset, callback: (error: Error, resource: any) => void) {
          resources.loadDir(url, type, callback);
     }
     //加载远程资源
     static loadRemote(url: string, callback: (error: Error, resource: any) => void) {
          assetManager.loadRemote(url, callback);
     }
     private static getBundle(bundleName: string): AssetManager.Bundle {
          let bundle = ACGAssetManager._bundleMap.get(bundleName);
          if (!bundle) {
               bundle = resources;
          }
          return bundle
     }
}
