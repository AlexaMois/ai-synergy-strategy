import automation from "@/assets/sketches/black-titanium/automation-silver.webp";
import products from "@/assets/sketches/black-titanium/products-silver.webp";
import agents from "@/assets/sketches/black-titanium/agents.webp";
import audit from "@/assets/sketches/black-titanium/audit.webp";

const sketches = {
  automation: {src: automation, width: 660, height: 365},
  products: {src: products, width: 660, height: 403},
  agents: {src: agents, width: 620, height: 440},
  audit: {src: audit, width: 660, height: 417},
} as const;
export type BrandSketchName = keyof typeof sketches;

// Decorative artwork only. The actual content, icons and actions stay in HTML.
export default function BrandSketch({name,className=""}:{name:BrandSketchName;className?:string}) {
  const {src,width,height}=sketches[name];
  return <img data-bt-sketch={name} className={className} src={src} width={width} height={height} alt="" aria-hidden="true" decoding="async"/>;
}
