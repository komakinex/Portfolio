
var scene = new THREE.Scene();

var fov = 75;
var width = window.innerWidth;
var height = window.innerHeight;
var aspect = width/height;
var near = 0.1;
var far = 1000;
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(40, -10, 45);

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


// リンクを追加
Js3Dink.setRendererObj(renderer, scene, camera);
Js3Dink.domEvent.addFnc('Fn','Fn');


//直方体
var boxGeometry = new THREE.BoxGeometry(5,5,5,2,2,2);
var boxMaterial = new THREE.MeshBasicMaterial({color:0xff00ff, wireframe:true});
var box = new THREE.Mesh(boxGeometry,boxMaterial);
box.position.set(18,7,33.5);
scene.add(box);
Js3Dink.addURL(box, 'https://www.instagram.com/komakinex/?hl=ja');
box.link.setNewTab('ON');



//円錐、角錐
var coneGeometry = new THREE.ConeGeometry(5,12,6); //半径、高さ、底面の分割数
var coneMaterial = new THREE.MeshNormalMaterial({color:0x00ff00});
var cone = new THREE.Mesh(coneGeometry,coneMaterial);
cone.position.set(30,0,12);
cone.rotation.set(Math.PI/2, 0, 0);
scene.add(cone);


//ドーナツ
var torusGeometry = new THREE.TorusGeometry(150,75,6,12);//半径、ドーナツの太さ、チューブ方向、水平方向の分割数
var torusMaterial = new THREE.MeshBasicMaterial({color:0x34ffff, wireframe:true});
var torus = new THREE.Mesh(torusGeometry,torusMaterial);
torus.position.set(0,0,0);
scene.add(torus);

// 多面体
var tamenGeometry = new THREE.IcosahedronGeometry(10); // 半径、分割数
var tamenMaterial = new THREE.MeshNormalMaterial({color: 0xFFFF00});
var tamen = new THREE.Mesh(tamenGeometry,tamenMaterial);
tamen.position.set(200,200,0);
scene.add(tamen);
Js3Dink.addURL(tamen, 'TopPage.html');

// 小さい球たち
var sballNUM = 2000;
var sball = [];
var sballgeometry = new THREE.SphereGeometry(0.2,8,4);
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
        // 小さい球のアニメーション
        for(var i = 0; i < sballNUM; i++)
        {
                // 瞬き
                sball[i].scale.x = 0.5 * Math.sin( Date.now() / 1000) + 1;
                sball[i].scale.y = 0.5 * Math.sin( Date.now() / 1000) + 1;
                sball[i].scale.z = 0.5 * Math.sin( Date.now() / 1000) + 1;

        }

        // 回転
        torus.rotation.x += 0.001;
        torus.rotation.y += 0.001;
        tamen.rotation.x -= 0.005;
        tamen.rotation.y -= 0.008;
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
