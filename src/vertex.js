import {SphereGeometry, MeshStandardMaterial, Mesh, ShaderMaterial} from 'three/build/three.module';
import outline_shader from './shader';


/* Класс вершины */
export default class Vertex extends Mesh {
  constructor(size, color) {
    const geometry = new SphereGeometry(size, 32, 32);
    const material = new MeshStandardMaterial({ color: color });
    super(geometry, material);
    this.name = 'Vertex';
    this.edges = [];

    let outlineShader = new ShaderMaterial({
      uniforms: outline_shader.uniforms,
      vertexShader: outline_shader.vertexShader,
      fragmentShader: outline_shader.fragmentShader
    });

    let mesh = new Mesh(geometry, outlineShader);
    mesh.material.depthWrite = false;
    this.shader_mesh = mesh;
  }

  /* Добавление прилегающего ребра */
  addEdge(edge) {
    this.edges.push(edge);
  }

  /* Перекраска всех прилегающих ребер */
  recolorEdges() {
    for (let edge of this.edges) {
      edge.material.color.set(this.material.color);
    }
  }
}
