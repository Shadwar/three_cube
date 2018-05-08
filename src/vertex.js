import {SphereGeometry, MeshBasicMaterial, Mesh} from 'three/build/three.module';


/* Класс вершины */
export default class Vertex extends Mesh {
  constructor(size, color) {
    const geometry = new SphereGeometry(size, 32, 32);
    const material = new MeshBasicMaterial({ color: color });
    super(geometry, material);

    this.edges = [];
  }

  /* Добавление прилегающего ребра */
  addEdge(edge) {
    this.edges.push(edge);
  }
}
