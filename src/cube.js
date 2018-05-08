import {Group} from 'three';
import Vertex from './vertex';
import Edge from './edge';


export default class Cube extends Group {
  constructor(size, vert_colors) {
    super();
    this.name = 'Cube';
    this.outline = new Group();

    this.createBody(size, vert_colors);
  }

  /* Создание тела кубика */
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
      let vertex = new Vertex(size/15, vert_colors[i]);
      vertex.position.set(...vert_coords[i]);
      vertices.push(vertex);
      this.add(vertex);

      vertex.shader_mesh.position.set(...vert_coords[i]);
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
      let edge = new Edge(0x777777, vert_coords[coord[0]], vert_coords[coord[1]]);
      vertices[coord[0]].addEdge(edge);
      vertices[coord[1]].addEdge(edge);
      this.add(edge);
    }
  }

  setPosition(x, y, z) {
    this.position.set(x, y, z);
    this.outline.position.set(x, y, z);
  }

  setRotation(x, y) {
    this.rotation.x = x;
    this.rotation.y = y;

    this.outline.rotation.x = x;
    this.outline.rotation.y = y;
  }
}

