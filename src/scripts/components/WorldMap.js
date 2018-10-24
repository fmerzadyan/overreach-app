import React from 'react';
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Marker
} from 'react-simple-maps';
import Markers from 'react-simple-maps/lib/Markers';
import { scaleLinear } from 'd3-scale';
import geoJsonObject from '../../assets/maps/world-50m-simplified.json';

const getLocationsCoordsMap = () => {
    const locations = [
        ['los angeles', [-118.2, 34.1]],
        ['new york', [-73.9, 40.7]],
        ['london', [0, 52]],
        ['berlin', [13.4, 52.5]],
        ['cairo', [31.3, 30.0]],
        ['moscow', [37.6, 55.8]],
        ['hong kong', [114, 22.2]],
        ['tokyo', [139.7, 35.7]],
        ['singapore', [103.8, 1.35]]
    ];
    return new Map(locations);
};

export default class WorldMap extends React.Component {
    state = {
        zoom: 3,
        defaultCentre: getLocationsCoordsMap().get('london'),
        map: getLocationsCoordsMap()
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
    };
    handleMarkerClick = ({coordinates}) => {
        for (const entry of getLocationsCoordsMap().entries()) {
             // Match city with coordinates.
            if (entry[1][0] === coordinates[0] && entry[1][1] === coordinates[1]) {
                // TODO: query Twitter API for this geolocation.
                console.log(entry[0]);
            }
        }
    };
    renderMarkers = () => {
        if (this.state.map) {
            let jsxCollection = [];
            // arguments for forEach: (value, key).
            this.state.map.forEach((value, key) => {
                let jsxElement = (
                    <Marker
                        key={key}
                        marker={{ coordinates: value }}
                        style={{
                            default: { fill: 'yellow' },
                            hover: { fill: 'orange' },
                            pressed: { fill: 'red' }
                        }}
                        onClick={this.handleMarkerClick}
                    >
                        <circle cx={0} cy={0} r={5} />
                    </Marker>
                );
                jsxCollection.push(jsxElement);
            });
            return jsxCollection;
        }
    };
    render() {
        const colorScale = scaleLinear()
            .domain([0, 100000000, 1338612970]) // Max is based on China
            .range(['#FFF176', '#FFC107', '#E65100']);
        return (
            <div>
                <button onClick={this.handleZoomIn}>{'+'}</button>
                <button onClick={this.handleZoomOut}>{'-'}</button>
                <hr />
                <ComposableMap style={{ width: '100%' }}>
                    <ZoomableGroup
                        zoom={this.state.zoom}
                        center={this.state.defaultCentre}
                        onMoveStart={this.handleMoveStart}
                        onMoveEnd={this.handleMoveEnd}
                    >
                        <Geographies geography={geoJsonObject} disableOptimization>
                            {(geographies, projection) => geographies.map((geography, i) => (
                                <Geography
                                    key={`geography-${i}`}
                                    cacheId={`geography-${i}`}
                                    geography={geography}
                                    projection={projection}
                                    style={{
                                        default: {
                                            fill: colorScale(geography.properties.pop_est),
                                            stroke: '#A239CA',
                                            strokeWidth: 0.3,
                                            outline: 'none',
                                        },
                                        hover:   { fill: '#A239CA'},
                                        pressed: { fill: '#4717F6' },
                                    }}
                                />
                            ))}
                        </Geographies>
                        <Markers>
                            {this.renderMarkers()}
                        </Markers>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        );
    }
}
