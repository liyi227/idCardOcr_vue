//file格式image与Base64格式image互相转换

//文件格式转Base64格式，参数img为图片文件
export const imageToBase64 = (img) => {
// Vue.prototype.$imageToBase64 = img => { //定义全局
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/jpeg" + ext);
    return dataURL;
};

//Base64格式转文件格式，参数urlData为Base64编码串，filename为转换为文件类型的文件主名
export const base64ToFile = (urlData, fileName) => {
    let arr = urlData.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bytes = atob(arr[1]); // 解码base64
    let n = bytes.length
    let ia = new Uint8Array(n);
    while (n--) {
        ia[n] = bytes.charCodeAt(n);
    }
    return new File([ia], fileName, { type: mime });
}
