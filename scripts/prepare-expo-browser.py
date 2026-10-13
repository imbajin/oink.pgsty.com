#!/usr/bin/env python3
"""Build tiny, ignored raster inputs for the browser fixture overlay."""
from pathlib import Path
import struct
import zlib

root=Path(__file__).resolve().parents[1]/'tests/fixtures/browser/content/expo-runtime/images'
root.mkdir(parents=True,exist_ok=True)
def png(w,h):
    def chunk(kind,data):
        return struct.pack('>I',len(data))+kind+data+struct.pack('>I',zlib.crc32(kind+data))
    pixels=b''.join(b'\0'+bytes([42,100+(y%80),155])*w for y in range(h))
    return b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',w,h,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(pixels))+chunk(b'IEND',b'')
for name,w,h in [('small',160,100),('large',1800,1200),('long',400,4000),('wide',4000,400)]:
    (root/f'{name}.png').write_bytes(png(w,h))
(root/'motion.gif').write_bytes(bytes.fromhex('474946383961010001008000002878aaeeddbb21ff0b4e45545343415045322e30030100000021f904000a0000002c000000000100010000020244010021f904000a0000002c00000000010001000002024c01003b'))
