import { useEffect, useRef, useState } from 'react';

interface Coords {
  longitude: number;
  latitude: number;
}

interface BaiduMapPickerProps {
  value?: Coords;
  onChange?: (coords: Coords) => void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BMap: any;
    onBMapLoad?: () => void;
  }
}

export function BaiduMapPicker({ value, onChange }: BaiduMapPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);
  const [ready, setReady] = useState(typeof window.BMap !== 'undefined');

  // Wait for BMap SDK to load
  useEffect(() => {
    if (typeof window.BMap !== 'undefined') {
      setReady(true);
      return;
    }
    const prev = window.onBMapLoad;
    window.onBMapLoad = () => {
      setReady(true);
      prev?.();
    };
    return () => {
      window.onBMapLoad = prev;
    };
  }, []);

  // Initialize map once SDK is ready
  useEffect(() => {
    if (!ready || !containerRef.current || mapRef.current) return;

    const BMap = window.BMap;
    const map = new BMap.Map(containerRef.current);
    const defaultCenter = new BMap.Point(117.242817, 31.768325);
    map.centerAndZoom(defaultCenter, 18);
    map.enableScrollWheelZoom(true);
    map.addControl(new BMap.NavigationControl());
    mapRef.current = map;

    // If an initial value is provided, place a marker
    if (value) {
      const pt = new BMap.Point(value.longitude, value.latitude);
      const marker = new BMap.Marker(pt);
      map.addOverlay(marker);
      map.panTo(pt);
      markerRef.current = marker;
    }

    map.addEventListener('click', (e: { point: { lng: number; lat: number } }) => {
      const { lng, lat } = e.point;

      if (markerRef.current) {
        map.removeOverlay(markerRef.current);
      }
      const marker = new BMap.Marker(new BMap.Point(lng, lat));
      map.addOverlay(marker);
      markerRef.current = marker;

      onChange?.({ longitude: lng, latitude: lat });
    });
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync external value changes to marker position
  useEffect(() => {
    if (!mapRef.current || !value) return;
    const BMap = window.BMap;
    const pt = new BMap.Point(value.longitude, value.latitude);
    if (markerRef.current) {
      mapRef.current.removeOverlay(markerRef.current);
    }
    const marker = new BMap.Marker(pt);
    mapRef.current.addOverlay(marker);
    markerRef.current = marker;
  }, [value?.longitude, value?.latitude]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {!ready && (
        <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
          地图加载中...
        </div>
      )}
      <div
        ref={containerRef}
        style={{ width: '100%', height: 400, display: ready ? 'block' : 'none' }}
      />
      {value && (
        <div style={{ marginTop: 4, color: '#888', fontSize: 12 }}>
          已选位置：经度 {value.longitude.toFixed(6)}，纬度 {value.latitude.toFixed(6)}
        </div>
      )}
    </div>
  );
}
