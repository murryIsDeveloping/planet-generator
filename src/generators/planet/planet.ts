import { PlanetConfig, PlanetStatus } from "./config";
import { NumberSeed } from "./../../util";
import { planetStyle, PlanetStyle } from "./style";

type PlanetResources = {
  liquid: number;
  gas: number;
  minerals: number;
  ring: number;
};

export class Planet {
  public name = this.planetConfig.name;
  public price: number = 0;
  public status: PlanetStatus;

  private seed = new NumberSeed(this.name.toUpperCase());
  public style: PlanetStyle;
  private resources: PlanetResources = {
    liquid: 0,
    gas: 0,
    minerals: 0,
    ring: 0,
  };

  constructor(private planetConfig: PlanetConfig) {
    this.calculate();
  }

  private calculate() {
    this.setStatus();
    if (this.status !== "Not Found") {
      this.style = planetStyle(this.planetConfig);
      this.calculateDetails();
    }
  }

  private setStatus() {
    if (this.planetConfig.status) {
      this.status = this.planetConfig.status;
    } else {
      const value = this.seed.next();
      this.status =
        value < this.planetConfig.supernovaPercent
          ? "Supernova'd"
          : value < this.planetConfig.soldPercent
          ? "Sold"
          : "For Sale";
    }
  }

  private calculateDetails() {
    this.resources = this.calculateResources();
    this.price = this.calculatePrice(this.resources);
  }

  private calculateResources(): PlanetResources {
    const waterOpacity = this.style.materials.water.opacity;
    const ringOpacity = this.style.materials.ring.opacity;
    const liquid = this.style.water && waterOpacity >= 0.5;
    const gas = this.style.water && waterOpacity < 0.5;
    const level = this.style.waterRadiusDif + this.style.height * 2;

    return {
      liquid: liquid ? level : 0,
      gas: gas ? level : 0,
      minerals: this.calculateMinerals(),
      ring: this.style.ring ? ringOpacity/2 * this.style.ringSize : 0,
    };
  }

  private calculateMinerals() {
    const amountOfMaterials = this.style.colors.length / 8;
    const radius = this.style.radius;
    const metalness = this.style.materials.terrain.metalness;
    return (metalness * 3 * amountOfMaterials * radius) / 2;
  }

  private calculatePrice(resources: PlanetResources) {
    return Math.round(
      (resources.gas +
        resources.liquid +
        resources.minerals * 5 +
        resources.ring) *
        100 *
        this.planetConfig.price
    ) * 10000;
  }

  public resourceLevel(resource: "liquid" | "gas" | "minerals" | "ring") {
    const amount = this.resources[resource];
    if (amount < 0.2) return "None";
    if (amount < 0.4) return "Low";
    if (amount < 0.6) return "Medium";
    if (amount < 0.8) return "High";
    return "Very High";
  }
}
