import {SphereGeometry, MeshStandardMaterial, Mesh, ShaderMaterial} from 'three/build/three.module';
import outline_shader from './shader';


/**
 * Класс вершины 
 *
 * Представляет из себя сферу определенного размера и цвета.
 */
export default class Vertex extends Mesh {

  /**
   * Вершина - сфера.
   * Кроме самой вершины создает дополнительный меш для outline эффекта.
   *
   * @param {number} size - размер сферы
   * @param {number} color - цвет материала
   */
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

  /**
   * Добавление ребра.
   * Для упрощения доступа к прилегающим ребрам, они добавляются
   * в отдельный массив объекта вершины.
   *
   * @param {Edge} edge - ребро
   */
  addEdge(edge) {
    this.edges.push(edge);
  }

  /**
   * Перекраска ребер.
   * Установка цвета материала рёбер, прилегающих к данной вершине
   * на цвет самой вершины.
   */
  recolorEdges() {
    for (let edge of this.edges) {
      edge.material.color.set(this.material.color);
    }
  }

  /**
   * Установка положения вершины.
   * Одновременно изменяет положение outline эффекта,
   * который является отдельным мешем.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  setPosition(x, y, z) {
    this.position.set(x, y, z);
    this.shader_mesh.position.set(x, y, z);
  }
}
