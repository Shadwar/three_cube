import {Mesh, MeshStandardMaterial, CylinderGeometry, Vector3, ShaderMaterial} from 'three';
import outline_shader from './shader';


/**
 * Класс ребра.
 *
 * Представляет из себя цилиндр установленного размера и цвета.
 */
export default class Edge extends Mesh {

  /**
   * Ребро для соединения вершин - цилиндр.
   * Кроме самого ребра создает дополнительный меш для outline эффекта.
   *
   * @param {number} size - длина ребра
   * @param {color} color - цвет материала
   */
  constructor(size, color) {
    const geometry = new CylinderGeometry(size/90, size/90, size, 32)
    geometry.translate(0, size/2, 0);
    geometry.rotateX(Math.PI / 2);
    const material = new MeshStandardMaterial({ color: color });
    super(geometry, material);
    this.name = 'Edge';

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
   * Установка положения ребра.
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

  /**
   * Направить ребро в сторону точки пространства.
   * Используется для того, чтобы соединить две вершины ребром.
   * Также направляет дополнительный меш outline эффекта.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  lookAt(x, y, z) {
    const endPoint = new Vector3(x, y, z);
    super.lookAt(endPoint);
    this.shader_mesh.lookAt(endPoint);
  }
}