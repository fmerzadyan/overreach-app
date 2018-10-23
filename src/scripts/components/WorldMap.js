import React from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Geography, Marker } from 'react-simple-maps';
import Markers from 'react-simple-maps/lib/Markers';

export default class WorldMap extends React.Component {
    state = {
        zoom: 2
    };
    handleZoomIn = () => {
        this.setState(() => ({
            zoom: this.state.zoom * 2
        }));
    };
    handleZoomOut = () => {
        this.setState(() => ({
            zoom: this.state.zoom / 2
        }));
    }
    render() {
        // Requires map json file to be in dist/ folder.
        const mapPath = './world-110m.json';
        return (
            <div>
                <button onClick={this.handleZoomIn}>{'Zoom in'}</button>
                <button onClick={this.handleZoomOut}>{'Zoom out'}</button>
                <hr />
                <ComposableMap style={{ width: "100%" }}>
                    <ZoomableGroup zoom={this.state.zoom} center={[8.5, 47.3]}>
                        <Geographies geography={mapPath}>
                            {(geographies, projection) => geographies.map(geography => (
                                <Geography
                                    key={geography.id}
                                    geography={geography}
                                    projection={projection}
                                />
                            ))}
                        </Geographies>
                        <Markers>
                            <Marker
                                marker={{ coordinates: [8.5, 47.3] }}
                                style={{
                                    default: { fill: "yellow" },
                                    hover: { fill: "orange" },
                                    pressed: { fill: "red" },
                                }
                                }>
                                <circle cx={0} cy={0} r={5} />
                            </Marker>
                        </Markers>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        );
    }
};
