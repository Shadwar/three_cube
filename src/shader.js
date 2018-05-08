const outline_shader = {
  uniforms: {"offset":  { type: "f", value: 1.0 }},
  vertexShader: [
      "uniform float offset;",
      "void main() {",
          "vec4 pos = modelViewMatrix * vec4( position + normal * (offset - 0.5), 1.0 );",
          "gl_Position = projectionMatrix * pos;",
      "}"
  ].join("\n"),
  fragmentShader: [
      "void main() {",
          "gl_FragColor = vec4( 1.0, 1.0, 1.0, 0.2 );",
      "}"
  ].join("\n")
};

export default outline_shader;