import {Line, LineBasicMaterial, Geometry, Vector3} from 'three';


/* Класс ребра куба */
export default class Edge extends Line {
  constructor(color, coord_start, coord_end) {
    const material = new LineBasicMaterial({ color: color, linewidth: 4});
    const geometry = new Geometry();
    geometry.vertices.push(
      new Vector3(...coord_start),
      new Vector3(...coord_end)
    );

    super(geometry, material);
    this.name = 'Edge';
  }
}