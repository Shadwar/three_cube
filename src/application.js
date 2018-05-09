import {Scene, PerspectiveCamera, DirectionalLight, WebGLRenderer, Raycaster, Vector2} from 'three';
import Cube from './cube';



/**
 * Класс приложения, отвечает за создание и отрисовку сцены, управление событиями.
 */
export default class Application {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.scene = new Scene();
    this.outlineScene = new Scene();

    this.camera = new PerspectiveCamera(40, this.width/this.height, 50, 10000);
    this.camera.position.z = 400;

    this.light = new DirectionalLight(0xffffff);
    this.light.position.set(0, 0, 100);
    this.scene.add(this.light);

    this.raycaster = new Raycaster()

    this.renderer = new WebGLRenderer({antialias: true});
    this.renderer.setSize(this.width, this.height);
    this.renderer.autoClear = false;
    this.renderer.domElement.addEventListener('click', (e) => this.onclick(e), true);

    this.populateScene();
  }

  /**
   * Наполнение сцены кубами.
   * Запрашивает у пользователя количество кубов и случайно их расставляет на сцене.
   */
  populateScene() {
    let cubeCount = NaN;

    while (isNaN(cubeCount)) {
      cubeCount = parseInt(window.prompt('Number of cubes', '1'));
    }

    const rand = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < cubeCount; i++) {
      let cube = new Cube(50, [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0x333333, 0xCCCCCC]);
      cube.setPosition(rand(-100, 100), rand(-100, 100), rand(-100, 100));
      cube.setRotation(rand(0, 180) * Math.PI/180, rand(0, 180) * Math.PI/180);

      this.scene.add(cube);
      this.outlineScene.add(cube.outline);
    }
  }

  /**
   * Событие нажатия мыши. 
   * Производит рейкаст по вершинам всех кубов в сцене и вызывает событие перекраски нажатой вершины. 
   * 
   * @param {MouseEvent} event - событие нажатия мыши
   */
  onclick(event) {
    const mouse = new Vector2(( event.clientX / this.width ) * 2 - 1, - ( event.clientY / this.height ) * 2 + 1)
    this.raycaster.setFromCamera(mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    for (let intersect of intersects) {
      if (intersect.object.name !== 'Vertex') continue;
      intersect.object.recolorEdges();
    }
  }

  /**
   * Запуск приложения.
   * Запускается цикл постоянной отрисовки сцены.
   * Можно сделать отрисовку по событию клика, но заранее выбран такой вариант,
   * если будут добавлены какие-либо действия на сцене, не зависящие от действий пользователя.
   */
  run() {
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.outlineScene, this.camera);
      this.renderer.render(this.scene, this.camera);
    }
    animate();
  }
}