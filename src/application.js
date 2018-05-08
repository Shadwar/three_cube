import {Scene, PerspectiveCamera, WebGLRenderer, Group, BoxBufferGeometry, MeshBasicMaterial, Mesh} from 'three/build/three.module';
import Cube from './cube';



/* Класс приложения, отвечает за создание и отрисовку сцены, управление событиями */
export default class Application {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.scene = new Scene();

    this.camera = new PerspectiveCamera(75, this.width/this.height, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new WebGLRenderer();
    this.renderer.setSize(this.width, this.height);

    this.populateScene();
  }

  /* Наполнение сцены кубами */
  populateScene() {
    var cube = new Cube(1, [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0x333333, 0xCCCCCC]);
    this.scene.add(cube);
  }

  /* Запуск приложения */
  run() {
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    }
    animate();
  }
}