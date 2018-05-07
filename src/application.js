import {Scene, PerspectiveCamera, WebGLRenderer} from 'three/build/three.module';


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