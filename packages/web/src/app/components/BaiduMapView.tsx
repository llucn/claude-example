import { useEffect, useRef, useState } from 'react';

interface BaiduMapViewProps {
  longitude: number;
  latitude: number;
}

export function BaiduMapView({ longitude, latitude }: BaiduMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const [ready, setReady] = useState(typeof window.BMap !== 'undefined');

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

  useEffect(() => {
    if (!ready || !containerRef.current || mapRef.current) return;
    const BMap = window.BMap;
    const map = new BMap.Map(containerRef.current);
    const pt = new BMap.Point(longitude, latitude);
    map.centerAndZoom(pt, 15);
    map.enableScrollWheelZoom(true);
    map.addControl(new BMap.NavigationControl());
    map.addOverlay(new BMap.Marker(pt));
    mapRef.current = map;
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <div style={{ marginTop: 8, color: '#888', fontSize: 13 }}>
        经度：{longitude}　纬度：{latitude}
      </div>
    </div>
  );
}
