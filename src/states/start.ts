import { ArcRotateCamera, Engine, Scene, Vector3 } from '@babylonjs/core'
import { AdvancedDynamicTexture, Image, Rectangle } from '@babylonjs/gui'
import { Game, Status } from './../app'

export async function start(
  this: Game,
  canvas: HTMLCanvasElement,
  engine: Engine,
  status: Status
) { 
  status._scene.detachControl()
  engine.displayLoadingUI()

  let sceneToLoad = new Scene(engine)
  const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI('ui', true, sceneToLoad)
  const background = new Rectangle('background')
  background.color = '#a9e4de'
  background.background = '#a9e4de'
  guiMenu.addControl(background)
  const camera: ArcRotateCamera = new ArcRotateCamera(
    'camera',
    Math.PI,
    Math.PI,
    1,
    Vector3.Zero(),
    sceneToLoad
  )
  camera.attachControl(true)

  await sceneToLoad.whenReadyAsync()
  sceneToLoad.attachControl()
  engine.hideLoadingUI()
  status._scene.dispose()
  status._scene = sceneToLoad
}