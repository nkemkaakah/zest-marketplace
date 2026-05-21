/**
 * Figma MCP asset URLs from:
 * https://www.figma.com/design/DQt7HK12DNJbK7dMoB1ju7/Full-E-Commerce-Website-UI-UX-Design--Community---Copy-
 * Expire after ~7 days; refresh via Figma MCP get_design_context when needed.
 */
const FIGMA_MCP = "https://www.figma.com/api/mcp/asset";

export const figmaAssets = {
  home: {
    heroIphone: `${FIGMA_MCP}/cf548d2d-2294-48e2-8077-3da52cc67c1f`,
    appleLogo: `${FIGMA_MCP}/66717000-2690-4b33-83e5-852ff44fb4a5`,
    musicGlow: `${FIGMA_MCP}/bc94127e-451c-47db-b56c-94ad49770ff8`,
    musicJbl: `${FIGMA_MCP}/52e54dfc-d349-482b-8236-189ef0256fa8`,
    ps5: `${FIGMA_MCP}/11c3e7b9-c4fa-4be4-b444-c4fbc4757417`,
    womensCollection: `${FIGMA_MCP}/ea36da22-067b-4244-a172-87ac6b1dfee0`,
    speakers: `${FIGMA_MCP}/c79b1109-bab4-40bc-9f3a-dbbed5a87620`,
    perfume: `${FIGMA_MCP}/97c238d6-f05f-4c02-9ac8-5af4c2056c5d`,
  },
  auth: {
    sideImage: `${FIGMA_MCP}/6942c841-05e7-4f1d-8fb4-36c6ac41c5cb`,
  },
  signup: {
    sideImage: `${FIGMA_MCP}/fa4db8e2-d11c-49f8-9132-571bb51a882f`,
  },
  about: {
    hero: `${FIGMA_MCP}/7542b391-e3d4-49fa-9649-58dca9c12f20`,
    tomCruise: `${FIGMA_MCP}/4b4b846b-d1a6-48a2-bc7b-189543ab77d1`,
    emmaWatson: `${FIGMA_MCP}/2e20e320-2f1a-4308-a521-5b0cf96aff27`,
    willSmith: `${FIGMA_MCP}/ca164990-487d-4674-bc06-3d54868855bb`,
  },
  checkout: {
    bkash: `${FIGMA_MCP}/4cb3bf14-a94a-4d4d-889e-ffcffd089835`,
    visa: `${FIGMA_MCP}/caca69f3-65fa-4257-b549-7958cfbefb77`,
    mastercard: `${FIGMA_MCP}/285e1e7f-5703-480c-893a-dc5551cc8c2a`,
    nagad: `${FIGMA_MCP}/b3703cfd-f314-4217-ab63-f624ecee4d49`,
  },
  wishlist: {
    gucciDuffle: `${FIGMA_MCP}/7eeebace-0a06-4165-98e1-107d33bfaa93`,
    rgbCooler: `${FIGMA_MCP}/9396d40a-da30-4efa-9c21-3123ecf73442`,
    gp11Gamepad: `${FIGMA_MCP}/07e29664-7cd8-494b-b4a1-107f0246d061`,
    satinJacket: `${FIGMA_MCP}/c2344dd4-e3ec-4085-8b50-c2a7c5bddb2a`,
    asusLaptop: `${FIGMA_MCP}/fcfbc8ce-1e98-4aa1-9715-cfe185fcb340`,
    gamingMonitor: `${FIGMA_MCP}/4a5f7383-4115-4363-a420-a3e565099503`,
    havitGamepad: `${FIGMA_MCP}/6b5451db-0418-4b6e-b9dc-ab3a2616d16f`,
    ak900Keyboard: `${FIGMA_MCP}/12c23166-3ee5-4ad9-bde7-7028145d1971`,
  },
} as const;
