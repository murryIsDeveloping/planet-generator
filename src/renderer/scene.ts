import { planetService } from 'src/services/planetService';
import { Planet } from './../generators/planet/planet';
import { MeshRenderer, MeshName } from './mesh';
import { DirectionalLight, Mesh, PerspectiveCamera, Scene, TextureLoader, WebGLRenderer } from "three";

import BG0 from './../assets/bg_0.jpg';
import BG1 from './../assets/bg_1.jpg';
import BG2 from './../assets/bg_2.jpg';
import BG3 from './../assets/bg_3.jpg';
import BG4 from './../assets/bg_4.jpg';
import { Subscription } from 'rxjs';

const backgrounds = [BG0,BG1,BG2,BG3,BG4]

export class PlanetScene {
    init = false;
    scene = new Scene();
    renderer = new WebGLRenderer();
    camera = new PerspectiveCamera(75, 1, 0.1, 1000);
    mesh: Mesh[] = [];
    superNovaMesh: Mesh;
    meshRenderer = new MeshRenderer()
    backgroundImage: string;
    widthSub: Subscription;
    width: number;

    constructor(){
      this.widthSub = planetService.renderSize$.subscribe(width => {
        this.width = width;
        if(this.renderer?.domElement) {
          this.renderer.domElement.style.width = `${this.width}px`;
          this.renderer.domElement.style.height = `${this.width}px`;
        }
      });
    }

    createScene(mount: any){
        this.init = true;
        this.setBackground(0)
        this.camera.position.z = 6;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        mount.appendChild(this.renderer.domElement);
        var light = new DirectionalLight(0xffffff, 1);
        light.position.set(0, 2, 2).normalize();
        this.scene.add(light);
  
        this.animate();
    }

    setBackground(index: number){
      let image = backgrounds[index%backgrounds.length]
      if(image !== this.backgroundImage) {
        var texture = new TextureLoader().load(image)
        this.scene.background = texture;
        this.backgroundImage = image;
      }
    }
  
    addPlanet(planet: Planet) {
      this.removeActiveMesh()
      if(planet.status !== "Not Found") {
        this.setBackground(planet.style.background)
        this.mesh = this.meshRenderer.mesh(planet.status, planet.style)
        this.mesh.forEach(mesh => this.scene.add(mesh))

        this.renderer.domElement.style.width = `${this.width}px`;
        this.renderer.domElement.style.height = `${this.width}px`;
      }
    }
  
    removeActiveMesh() {
      this.mesh.forEach(mesh => this.scene.remove(mesh));
    }
  
    animate() {
      const animate = () => {
        requestAnimationFrame(animate);
  
        this.mesh.forEach(mesh => {
          if(mesh.name === MeshName.TERRAIN || mesh.name === MeshName.WATER) mesh.rotation.y += 0.005
          if(mesh.name === MeshName.RING || mesh.name === MeshName.BLACKHOLE) mesh.rotation.z += 0.005
        })
    
        this.renderer.render(this.scene, this.camera);
      }

      animate();
    }
  }

export const planetScene = new PlanetScene();