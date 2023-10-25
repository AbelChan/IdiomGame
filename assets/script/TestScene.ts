// /*
//  * @Author: Abel Chan
//  * @Date: 2020-09-12 21:23:11
//  * @LastEditors: Abel Chan
//  * @LastEditTime: 2020-10-25 22:25:13
//  * @FilePath: \assets\script\TestScene.ts
//  * @description: 
//  */

import { _decorator, Component, Asset, AssetManager } from 'cc';
const { ccclass, property } = _decorator;

import { ACGGraph } from "./acgframework/data_structure/ACGGraph";

@ccclass('TestScene')
export class TestData {
    constructor(index) {
        // this.index = index;
    }
    private index: number = 0;
}

export default class TestScene extends Component {
    //    // onLoad () {}
    start() {


        // let graph = new ACGGraph<TestData>();


        // setTimeout(()=>{
        // let url = ["prefabes/word", "prefabes/word1"];
        //            // let url = "prefabes/word";
        // this.loadRes(url, cc.Prefab, ()=>{

        // });

        // this.bunleTest();
        // }, 1000);
    }

    loadRes(url: string | string[], type: typeof Asset, callback: (error: Error, resource: any) => void) {
        // cc.resources.load(url, type, (err: Error, resource: any) => {
        // callback(err, resource);
        // });
    }

    builtinsTest() {

    }

    bunleTest() {
        // cc.assetManager.loadBundle("/data/", cc.JsonAsset, (error: Error, bundle: cc.AssetManager.Bundle) => {
        // let info = bundle.getInfoWithPath("/first");
        // let dir = bundle.getDirWithPath("/");
        // let assets = bundle.getAssetInfo("");       //获得资源使用uuid
        // this.loadAsset(bundle);
        // });
    }

    private loadAsset(bundle: AssetManager.Bundle) {
        // bundle.load("first", cc.JsonAsset, (err, data) => {
        // console.log("err: " + err);

        // let firstData = bundle.get("/first", cc.JsonAsset);
        // console.log("get Data:" + JSON.stringify(firstData));
        // });

        // bundle.preload("stage", cc.JsonAsset, null, (error: Error, item) => {
        // console.log(`preload`);
        // });
        // bundle.loadDir('/', cc.JsonAsset, null, (err: Error, assets: cc.Asset[]) =>{
        // console.log("loadDir");
        // });
        // bundle.preloadDir('/', cc.JsonAsset, null, (err: Error, items) => {
        // console.log("preloadDir");
        // });
        // let data = bundle.get("/first", cc.JsonAsset);
        // console.log("get Data:" + JSON.stringify(data));
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// /*
//  * @Author: Abel Chan
//  * @Date: 2020-09-12 21:23:11
//  * @LastEditors: Abel Chan
//  * @LastEditTime: 2020-10-25 22:25:13
//  * @FilePath: \assets\script\TestScene.ts
//  * @description:
//  */
//
// import { ACGGraph } from "./acgframework/data_structure/ACGGraph";
//
//
//
//
// export class TestData{
//     constructor(index){
//         this.index = index;
//     }
//     private index: number = 0;
// }
//
//
// const {ccclass, property} = cc._decorator;
//
// @ccclass
// export default class TestScene extends cc.Component {
//
//     // onLoad () {}
//
//     start () {
//
//
//         let graph = new ACGGraph<TestData>();
//
//
//         setTimeout(()=>{
//             let url = ["prefabes/word", "prefabes/word1"];
//             // let url = "prefabes/word";
//             this.loadRes(url, cc.Prefab, ()=>{
//
//             });
//
//             this.bunleTest();
//         }, 1000);
//     }
//
//     loadRes(url: string | string[], type: typeof cc.Asset, callback: (error: Error, resource: any) => void){
//         cc.resources.load(url, type, (err: Error, resource: any) => {
//             callback(err, resource);
//         });
//     }
//
//     builtinsTest(){
//
//     }
//
//     bunleTest(){
//         cc.assetManager.loadBundle("/data/", cc.JsonAsset, (error: Error, bundle: cc.AssetManager.Bundle) => {
//             let info = bundle.getInfoWithPath("/first");
//             let dir = bundle.getDirWithPath("/");
//             let assets = bundle.getAssetInfo("");       //获得资源使用uuid
//             this.loadAsset(bundle);
//         });
//     }
//
//     private loadAsset(bundle: cc.AssetManager.Bundle){
//         bundle.load("first", cc.JsonAsset, (err, data) => {
//             console.log("err: " + err);
//
//             let firstData = bundle.get("/first", cc.JsonAsset);
//             console.log("get Data:" + JSON.stringify(firstData));
//         });
//
//         bundle.preload("stage", cc.JsonAsset, null, (error: Error, item) => {
//             console.log(`preload`);
//         });
//         bundle.loadDir('/', cc.JsonAsset, null, (err: Error, assets: cc.Asset[]) =>{
//             console.log("loadDir");
//         });
//         bundle.preloadDir('/', cc.JsonAsset, null, (err: Error, items) => {
//             console.log("preloadDir");
//         });
//         let data = bundle.get("/first", cc.JsonAsset);
//         console.log("get Data:" + JSON.stringify(data));
//     }
// }
