
var scene = new THREE.Scene();

var fov = 75;
var aspect = window.innerWidth / window.innerHeight;
var near = 0.1;
var far = 1000;
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(30, 13, 38);

var light = new THREE.DirectionalLight(0xffffff);
light.position.set(50, 50, 50);
scene.add(light);


//環境光
var ambient = new THREE.AmbientLight(0x333333);
scene.add(ambient);

// Rendererを用意
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

//マウスで動かす
var controls = new THREE.OrbitControls(camera);


// リンク追加
Js3Dink.setRendererObj(renderer, scene, camera);
Js3Dink.domEvent.addFnc('Fn','Fn');


//直方体
var boxGeometry = new THREE.BoxGeometry(50,40,80,2,2,2);
var boxMaterial = new THREE.MeshBasicMaterial({color:0xff00ff, wireframe:true});
var box = new THREE.Mesh(boxGeometry,boxMaterial);
box.position.set(-130,-40,120);
box.rotation.set( Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI );
scene.add(box);
Js3Dink.addURL(box, 'toon.html');


//円錐、角錐
var coneGeometry = new THREE.ConeGeometry(30,70,6); //半径、高さ、底面の分割数
var coneMaterial = new THREE.MeshNormalMaterial({color:0x00ff00});
var cone = new THREE.Mesh(coneGeometry,coneMaterial);
cone.position.set(80,-100,100);
cone.rotation.x = Math.random() * 2 * Math.PI;
cone.rotation.y = Math.random() * 2 * Math.PI;
cone.rotation.z = Math.random() * 2 * Math.PI;
scene.add(cone);
Js3Dink.addURL(cone, 'https://qiita.com/wifeofvillon/items/bed79dc85f956c8169a0');

//ドーナツ
var torusGeometry = new THREE.TorusGeometry(50,25,6,12);//半径、ドーナツの太さ、チューブ方向、水平方向の分割数
var torusMaterial = new THREE.MeshBasicMaterial({color:0x34ffff, wireframe:true});
var torus = new THREE.Mesh(torusGeometry,torusMaterial);
torus.position.set(125,15,-50);
torus.rotation.x = Math.random() * 2 * Math.PI;
torus.rotation.y = Math.random() * 2 * Math.PI;
torus.rotation.z = Math.random() * 2 * Math.PI;
scene.add(torus);
Js3Dink.addURL(torus, 'SNSPage.html');

//球
var sphereGeometry = new THREE.SphereGeometry(50,16,10);
var sphereMaterial = new THREE.MeshBasicMaterial({color:0xffff00, wireframe:true});
var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere.position.set(-100,40,-80);
sphere.rotation.x = Math.random() * 2 * Math.PI;
sphere.rotation.y = Math.random() * 2 * Math.PI;
sphere.rotation.z = Math.random() * 2 * Math.PI;
scene.add(sphere);
Js3Dink.addURL(sphere,'NovelPage.html');



// 小さい球たち
// 画面見切れたら下から新しいのが出てくるようにする
var sballNUM = 2000;
var sball = [];
var sballgeometry = new THREE.SphereGeometry(0.5,8,4);
var sballmaterial = new THREE.MeshBasicMaterial( { color: 0xaaffff, wireframe:true } );
for(var i = 0; i < sballNUM; i++)
{
        sball[i] = new THREE.Mesh( sballgeometry, sballmaterial );
        sball[i].position.set( Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400 );
        scene.add(sball[i]);
}

// アニメーション
function animate ()
{
        // 小さい球
        for(var i = 0; i < sballNUM; i++)
        {
                // 瞬き
                sball[i].scale.x = 0.9 * Math.sin( Date.now() / 1000) + 1;
                sball[i].scale.y = 0.9 * Math.sin( Date.now() / 1000) + 1;
                sball[i].scale.z = 0.9 * Math.sin( Date.now() / 1000) + 1;
        }
        requestAnimationFrame(animate);
        renderer.render(scene,camera);
}
animate();


function rendererRender()
{
      renderer.render(scene, camera);
      controls.update(); //OrbitControlsの更新
      requestAnimationFrame(rendererRender);
}
rendererRender();
