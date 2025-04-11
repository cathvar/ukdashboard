interface GeoFeature {
  type: string;
  properties: {
    name: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

interface GeoCollection {
  type: string;
  features: GeoFeature[];
}

const ukGeoData: GeoCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "England"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-0.126236, 51.500152],
          [0.005327, 51.476927],
          [0.123138, 51.497904],
          [0.147324, 51.451722],
          [-0.126236, 51.500152]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Scotland"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-4.251806, 55.858748],
          [-4.207818, 55.864238],
          [-4.251806, 55.858748]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Wales"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-3.183241, 51.481583],
          [-3.168907, 51.487345],
          [-3.183241, 51.481583]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Northern Ireland"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-5.930120, 54.597285],
          [-5.915100, 54.602802],
          [-5.930120, 54.597285]
        ]]
      }
    }
  ]
};

export default ukGeoData; 