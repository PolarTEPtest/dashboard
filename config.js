const stacStore = window.eodashStore?.stac?.useSTAcStore();
let handleMoveEnd = null;
const { mapInstance, currentUrl } = window?.eodashStore?.states;

/**
 * @type {import("@eodash/eodash").EodashConfig<"runtime">}
 */
export default {
  id: "template-id",
  stacEndpoint:
      "https://polarteptest.github.io/catalog/polar/catalog.json",
  routes: [],
  brand: {
    name: "PolarTEP Dashboard",
    font: {
      family: "Poppins",
    },
    theme: {
      colors: {
        primary: "#778899",
        secondary: "#708090",
        background: "#FFFFFF",
        surface: "#FFFFFF",
      },
    },
  },
  template: {
    gap: 6,
    background: {
      id: Symbol(),
      widget: {
        link: "https://cdn.skypack.dev/@eox/map",
        properties: {
          class: "fill-height fill-width overflow-none",
          center: [15, 48],
          layers: [{ type: "Tile", source: { type: "OSM" } }],
        },
        tagName: "eox-map",
        onMounted(el, _, router) {
          /** @type {any} */ (el).zoom = router.currentRoute.value.query["z"];

          mapInstance.value = /** @type {any} */ (el).map;

          mapInstance.value?.on(
            "moveend",
            (handleMoveEnd = /** @param {any} evt  */ (evt) => {
              router.push({
                query: {
                  z: `${evt.map.getView().getZoom()}`,
                },
              });
            })
          );
        },
        onUnmounted(_el, _store, _router) {
          mapInstance.value?.un("moveend", handleMoveEnd);
        },
      },
      type: "web-component",
    },
    widgets: [
      {
        id: Symbol(),
        title: "Tools",
        layout: { x: 0, y: 0, w: 3, h: 12 },
        widget: {
          link: "https://cdn.skypack.dev/@eox/itemfilter",
          properties: {
            config: {
              titleProperty: "title",
              filterProperties: [
                {
                  keys: ["title", "themes"],
                  title: "Search",
                  type: "text",
                  expanded: true,
                },
                {
                  key: "themes",
                  title: "Theme",
                  type: "multiselect",
                  featured: true,
                },
              ],
              aggregateResults: "themes",
              enableHighlighting: true,
              onSelect: async (item) => {
                // console.log(item);
                await stacStore.loadSelectedSTAC(item.href);
              },
            },
          },
          onMounted: async function (el, store, _) {
            /** @type {any} */ (el).apply(store?.stac);
          },
          tagName: "eox-itemfilter",
        },
        type: "web-component",
      },
      {
        layout: { x: 9, y: 0, w: 3, h: 12 },
        defineWidget: (selectedSTAC) => {
          const wmsLink =
            selectedSTAC?.links.find((l) => l.rel == "wms") ?? false;
          return wmsLink
            ? {
                id: `${wmsLink["wms:layers"][0]} Map`,
                title: "Map",
                type: "web-component",
                widget: {
                  link: "https://cdn.skypack.dev/@eox/map",
                  properties: {
                    class: "fill-height fill-width",
                    center: [15, 48],
                    layers: [
                      {
                        type: "Tile",
                        source: {
                          type: "TileWMS",
                          url: wmsLink.href,
                          params: {
                            LAYERS: wmsLink["wms:layers"],
                            TILED: true,
                          },
                          ratio: 1,
                          serverType: "geoserver",
                        },
                      },
                    ],
                  },
                  tagName: "eox-map",
                  onMounted(el, _, router) {
                    /** @type {any} */ (el).zoom =
                      router.currentRoute.value.query["z"];
                    mapInstance.value = /** @type {any} */ (el).map;
                    mapInstance.value?.on(
                      "moveend",
                      (handleMoveEnd = (evt) => {
                        router.push({
                          query: {
                            z: `${evt.map.getView().getZoom()}`,
                          },
                        });
                      })
                    );
                  },
                  onUnmounted(_el, _store, _router) {
                    mapInstance.value?.un("moveend", handleMoveEnd);
                  },
                },
              }
            : {
                id: "Information",
                title: "Information",
                type: "web-component",
                widget: {
                  link: "https://cdn.skypack.dev/@eox/stacinfo",
                  tagName: "eox-stacinfo",
                  properties: {
                    for: currentUrl,
                    allowHtml: "true",
                    styleOverride:
                      "#properties li > .value {font-weight: normal !important;}",
                    header: "[]",
                    subheader: "[]",
                    properties: '["description"]',
                    featured: "[]",
                    footer: "[]",
                  },
                },
              };
        },
      },
    ],
  },
};
