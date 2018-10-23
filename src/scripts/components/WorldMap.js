import React from 'react';
import {ComposableMap, ZoomableGroup, Geographies, Geography} from 'react-simple-maps';

export default class WorldMap extends React.Component {
    state = {
        zoom: 1
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
                <ComposableMap>
                    <ZoomableGroup zoom={this.state.zoom}>
                        <Geographies geography={mapPath}>
                            {(geographies, projection) => geographies.map(geography => (
                                <Geography
                                    key={geography.id}
                                    geography={geography}
                                    projection={projection}
                                />
                            ))}
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        );
    }
};
