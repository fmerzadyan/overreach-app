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

export default class WorldMap extends React.Component {
    state = {
        zoom: 2,
        defaultCentre: [0, 52],
        markers: [
            [-118.2, 34.1], // Los Angeles
            [-73.9, 40.7], // New York
            [0, 52], // London
            [13.4, 52.5], // Berlin
            [31.3, 30.0], // Cairo
            [37.6, 55.8], // Moscow
            [114, 22.2], // Hong Kong
            [139.7, 35.7], // Tokyo
            [103.8, 1.35] // Singapore
        ]
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
    handleMarkerClick = (marker, e) => {
        console.log(marker);
    };
    renderMarkers = () => {
        if (this.state.markers.length > 0) {
            let jsxCollection = [];
            this.state.markers.forEach((marker, index) => {
                let jsxElement = (
                    <Marker
                        key={index}
                        marker={{ coordinates: marker }}
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
                                            stroke: '#FFF',
                                            strokeWidth: 0.5,
                                            outline: 'red',
                                        },
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
