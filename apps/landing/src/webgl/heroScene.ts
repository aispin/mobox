import * as THREE from 'three'
import { heroFragmentShader, heroVertexShader } from './shaders'

export interface HeroScene {
  dispose(): void
}

export function createHeroScene(canvas: HTMLCanvasElement): HeroScene {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: false,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }

  const material = new THREE.ShaderMaterial({
    vertexShader: heroVertexShader,
    fragmentShader: heroFragmentShader,
    uniforms,
    depthTest: false,
    depthWrite: false,
  })
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
  mesh.frustumCulled = false
  scene.add(mesh)

  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth
    const h = canvas.clientHeight || window.innerHeight
    renderer.setSize(w, h, false)
    const ratio = renderer.getPixelRatio()
    uniforms.uResolution.value.set(w * ratio, h * ratio)
  }
  resize()
  window.addEventListener('resize', resize)

  const target = new THREE.Vector2(0, 0)
  const scratch = new THREE.Vector2(0, 0)
  const onPointer = (e: PointerEvent) => {
    target.x = (e.clientX / window.innerWidth) * 2 - 1
    target.y = -((e.clientY / window.innerHeight) * 2 - 1)
  }
  window.addEventListener('pointermove', onPointer, { passive: true })

  const clock = new THREE.Clock()
  let raf = 0
  const loop = () => {
    raf = requestAnimationFrame(loop)
    uniforms.uTime.value = clock.getElapsedTime()
    scratch.copy(target).multiplyScalar(0.06)
    uniforms.uMouse.value.add(scratch)
    renderer.render(scene, camera)
  }
  loop()

  return {
    dispose() {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      mesh.geometry.dispose()
      material.dispose()
      renderer.dispose()
    },
  }
}
