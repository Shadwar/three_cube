import {Mesh, MeshStandardMaterial, CylinderGeometry, Vector3, ShaderMaterial} from 'three';
import outline_shader from './shader';


/* Класс ребра куба */
export default class Edge extends Mesh {
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

  /* Установка положения ребра
  */
  setPosition(x, y, z) {
    this.position.set(x, y, z);
    this.shader_mesh.position.set(x, y, z);
  }

  /* Направить ребро от начальной точки в сторону конечной
  */
  lookAt(x, y, z) {
    const endPoint = new Vector3(x, y, z);
    super.lookAt(endPoint);
    this.shader_mesh.lookAt(endPoint);
  }
}