import {Group} from 'three';
import Vertex from './vertex';
import Edge from './edge';


export default class Cube extends Group {
  constructor(size, vert_colors) {
    super();

    this.all_vertices = [];

    this.createBody(size, vert_colors);
  }

  /* Создание тела кубика */
  createBody(size, vert_colors) {
    const vert_coords = [
      [-1.0, -1.0,  1.0],
      [-1.0,  1.0,  1.0],
      [ 1.0,  1.0,  1.0],
      [ 1.0, -1.0,  1.0],
      [-1.0, -1.0, -1.0],
      [-1.0,  1.0, -1.0],
      [ 1.0,  1.0, -1.0],
      [ 1.0, -1.0, -1.0],
    ];

    for (let i = 0; i < vert_coords.length; i++) {
      let vertex = new Vertex(size/20, vert_colors[i]);
      vertex.position.set(...vert_coords[i]);
      this.all_vertices.push(vertex);
      this.add(vertex);
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
      this.all_vertices[coord[0]].addEdge(edge);
      this.all_vertices[coord[1]].addEdge(edge);
      this.add(edge);
    }
  }
}

