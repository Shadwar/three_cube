import {Group, Vector3} from 'three';
import Vertex from './vertex';
import Edge from './edge';

/* Куб, состоит из отдельных вершин и ребер
*/
export default class Cube extends Group {
  constructor(size, vert_colors) {
    super();
    this.name = 'Cube';
    this.outline = new Group();

    this.createBody(size, vert_colors);
  }

  /* Создание тела куба */
  createBody(size, vert_colors) {
    const half = size / 2;

    const vert_coords = [
      [-half, -half,  half],
      [-half,  half,  half],
      [ half,  half,  half],
      [ half, -half,  half],
      [-half, -half, -half],
      [-half,  half, -half],
      [ half,  half, -half],
      [ half, -half, -half],
    ];

    let vertices = [];

    for (let i = 0; i < vert_coords.length; i++) {
      let vertex = new Vertex(size/30, vert_colors[i]);
      vertex.setPosition(...vert_coords[i]);

      vertices.push(vertex);
      this.add(vertex);
      this.outline.add(vertex.shader_mesh);
    }

    const edge_coords = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [0, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [1, 5],
      [2, 6],
      [3, 7]
    ];

    for (let coord of edge_coords) {
      let edge = new Edge(size, 0x777777);
      edge.setPosition(...vert_coords[coord[0]]);
      edge.lookAt(...vert_coords[coord[1]]);
      vertices[coord[0]].addEdge(edge);
      vertices[coord[1]].addEdge(edge);
      this.add(edge);
      this.outline.add(edge.shader_mesh);
    }
  }

  /* Установка положения всего куба, включая outline
  */
  setPosition(x, y, z) {
    this.position.set(x, y, z);
    this.outline.position.set(x, y, z);
  }

  /* Установка вращения всего куба, включая outline
  */
  setRotation(x, y) {
    this.rotation.x = x;
    this.rotation.y = y;

    this.outline.rotation.x = x;
    this.outline.rotation.y = y;
  }
}

