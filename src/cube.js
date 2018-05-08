import {Group, SphereGeometry, MeshBasicMaterial, Mesh, LineBasicMaterial, Geometry, Line, Vector3} from 'three';


export default class Cube extends Group {
  constructor(size, vert_colors) {
    super();

    this.all_vertices = [];

    this.createBody(size, vert_colors);
  }

  createBody(size, vert_colors) {
    const vertex_coords = [
      [-1.0, -1.0,  1.0],
      [-1.0,  1.0,  1.0],
      [ 1.0,  1.0,  1.0],
      [ 1.0, -1.0,  1.0],
      [-1.0, -1.0, -1.0],
      [-1.0,  1.0, -1.0],
      [ 1.0,  1.0, -1.0],
      [ 1.0, -1.0, -1.0],
    ];

    const vertexGeometry = new SphereGeometry(size/20, 32, 32);

    for (let i = 0; i < vertex_coords.length; i++) {
      let vertexMaterial = new MeshBasicMaterial({ color: vert_colors[i] });
      let vertex = new Mesh(vertexGeometry, vertexMaterial);
      vertex.position.set(...vertex_coords[i]);
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

    const edgeMaterial = new LineBasicMaterial({ color: 0x777777, linewidth: 4});
    for (let coord of edge_coords) {
      let edgeGeometry = new Geometry();
      edgeGeometry.vertices.push(
        new Vector3(...vertex_coords[coord[0]]),
        new Vector3(...vertex_coords[coord[1]])
      );
      let edge = new Line(edgeGeometry, edgeMaterial);
      this.add(edge);
    }
  }
}

