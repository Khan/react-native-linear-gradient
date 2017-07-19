/**
 * @providesModule LinearGradient
 * @flow
 */
import React, { Component } from 'react';
import { processColor, requireNativeComponent, PointPropType, View, ViewPropTypes } from 'react-native';
import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';

const convertPoint = (name, point) => {
  if (Array.isArray(point)) {
    console.warn(
      `LinearGradient '${name}' property shoule be an object with fields 'x' and 'y', ` +
      'Array type is deprecated.'
    );

    return {
      x: point[0],
      y: point[1]
    };
  }
  return point;
};

type PropsType = {
  start?: Array<number> | {x: number, y: number};
  end?: Array<number> | {x: number, y: number};
  colors: Array<string>;
  locations?: Array<number>;
} & ViewProps;

export default class LinearGradient extends Component {
  props: PropsType;
  gradientRef: any;

  setNativeProps(props: PropsType) {
    this.gradientRef.setNativeProps(props);
  }

  render() {
    const {
      start,
      end,
      colors,
      locations,
      ...otherProps
    } = this.props;
    if ((colors && locations) && (colors.length !== locations.length)) {
      console.warn('LinearGradient colors and locations props should be arrays of the same length');
    }

    return (
      <NativeLinearGradient
        ref={(component) => { this.gradientRef = component; }}
        {...otherProps}
        startPoint={convertPoint('start', start)}
        endPoint={convertPoint('end', end)}
        colors={colors.map(processColor)}
        locations={locations ? locations.slice(0, colors.length) : null}
      />
    );
  }
}

const NativeLinearGradient = requireNativeComponent('BVLinearGradient', null);
