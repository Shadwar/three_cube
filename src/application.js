import {Scene, PerspectiveCamera, WebGLRenderer, Raycaster, Vector2} from 'three';
import Cube from './cube';



/* Класс приложения, отвечает за создание и отрисовку сцены, управление событиями */
export default class Application {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.scene = new Scene();

    this.camera = new PerspectiveCamera(75, this.width/this.height, 0.1, 1000);
    this.camera.position.z = 5;

    this.raycaster = new Raycaster()

    this.renderer = new WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.domElement.addEventListener('click', (e) => this.onclick(e), true);


    this.populateScene();
  }

  /* Наполнение сцены кубами */
  populateScene() {
    var cube1 = new Cube(1, [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0x333333, 0xCCCCCC]);
    cube1.position.set(-0.5, -1, 0);
    var cube2 = new Cube(1, [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0x333333, 0xCCCCCC]);
    cube2.position.set(1, 0.5, 0);

    this.scene.add(cube1);
    this.scene.add(cube2);
  }

  /* Событие нажатия мышки. Сделать рейкаст по вершинам всех кубов в сцене */
  onclick(event) {
    const mouse = new Vector2(( event.clientX / this.width ) * 2 - 1, - ( event.clientY / this.height ) * 2 + 1)
    this.raycaster.setFromCamera(mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    for (let intersect of intersects) {
      if (intersect.object.name !== 'Vertex') continue;
      intersect.object.recolorEdges();
    }
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