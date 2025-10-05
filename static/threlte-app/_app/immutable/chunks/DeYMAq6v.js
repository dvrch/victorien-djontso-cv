var q=Object.defineProperty;var J=(e,t,r)=>t in e?q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var N=(e,t,r)=>J(e,typeof t!="symbol"?t+"":t,r);import{V as R,K as U,h as X,ah as Q,j as ee,F as re,bb as p,ai as te,a as $,o as ne,aF as Z}from"./mwyEQVmZ.js";new R;new R;new R;const E=new U,G=new U,O=[],M=new X,ie=e=>e.isMaterial;class Oe extends Q{constructor(r,o){super();N(this,"color");N(this,"instancedMesh");N(this,"instances");this.color=new ee("white"),this.instancedMesh=r,this.instances=o}get geometry(){var r;return(r=this.instancedMesh.current)==null?void 0:r.geometry}raycast(r,o){var c;const n=this.instancedMesh.current;if(!n||!n.geometry||!n.material)return;M.geometry=n.geometry;const i=n.matrixWorld,a=this.instances.current.indexOf(this);if(!(a===-1||a>n.count)){n.getMatrixAt(a,E),G.multiplyMatrices(i,E),M.matrixWorld=G,ie(n.material)?M.material.side=n.material.side:M.material.side=((c=n.material[0])==null?void 0:c.side)??re,M.raycast(r,O);for(let l=0,s=O.length;l<s;l++){const u=O[l];u.instanceId=a,u.object=this,o.push(u)}O.length=0}}}`${p.logdepthbuf_pars_vertex}${p.fog_pars_vertex}${p.logdepthbuf_vertex}${p.fog_vertex}`;`${p.tonemapping_fragment}${p.colorspace_fragment}`;`${p.tonemapping_fragment}${p.colorspace_fragment}`;const oe=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`,ae=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`,ce=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,le=ce,se=`
	${oe}
	${ae}
`;`${le}${se}${p.tonemapping_fragment}${p.colorspace_fragment}`;for(let e=0;e<256;e++)(e<16?"0":"")+e.toString(16);new te(-1,1,1,-1,0,1);class ue extends ne{constructor(){super(),this.setAttribute("position",new Z([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Z([0,2,0,0,2,0],2))}}new ue;var L={exports:{}};L.exports=z;L.exports.default=z;function z(e,t,r){r=r||2;var o=t&&t.length,n=o?t[0]*r:e.length,i=j(e,0,n,r,!0),a=[];if(!i||i.next===i.prev)return a;var c,l,s,u,x,f,h;if(o&&(i=ye(e,t,i,r)),e.length>80*r){c=s=e[0],l=u=e[1];for(var y=r;y<n;y+=r)x=e[y],f=e[y+1],x<c&&(c=x),f<l&&(l=f),x>s&&(s=x),f>u&&(u=f);h=Math.max(s-c,u-l),h=h!==0?32767/h:0}return I(i,a,r,c,l,h,0),a}function j(e,t,r,o,n){var i,a;if(n===B(e,t,r,o)>0)for(i=t;i<r;i+=o)a=V(i,e[i],e[i+1],a);else for(i=r-o;i>=t;i-=o)a=V(i,e[i],e[i+1],a);return a&&T(a,a.next)&&(_(a),a=a.next),a}function g(e,t){if(!e)return e;t||(t=e);var r=e,o;do if(o=!1,!r.steiner&&(T(r,r.next)||m(r.prev,r,r.next)===0)){if(_(r),r=t=r.prev,r===r.next)break;o=!0}else r=r.next;while(o||r!==t);return t}function I(e,t,r,o,n,i,a){if(e){!a&&i&&De(e,o,n,i);for(var c=e,l,s;e.prev!==e.next;){if(l=e.prev,s=e.next,i?ve(e,o,n,i):fe(e)){t.push(l.i/r|0),t.push(e.i/r|0),t.push(s.i/r|0),_(e),e=s.next,c=s.next;continue}if(e=s,e===c){a?a===1?(e=de(g(e),t,r),I(e,t,r,o,n,i,2)):a===2&&xe(e,t,r,o,n,i):I(g(e),t,r,o,n,i,1);break}}}}function fe(e){var t=e.prev,r=e,o=e.next;if(m(t,r,o)>=0)return!1;for(var n=t.x,i=r.x,a=o.x,c=t.y,l=r.y,s=o.y,u=n<i?n<a?n:a:i<a?i:a,x=c<l?c<s?c:s:l<s?l:s,f=n>i?n>a?n:a:i>a?i:a,h=c>l?c>s?c:s:l>s?l:s,y=o.next;y!==t;){if(y.x>=u&&y.x<=f&&y.y>=x&&y.y<=h&&D(n,c,i,l,a,s,y.x,y.y)&&m(y.prev,y,y.next)>=0)return!1;y=y.next}return!0}function ve(e,t,r,o){var n=e.prev,i=e,a=e.next;if(m(n,i,a)>=0)return!1;for(var c=n.x,l=i.x,s=a.x,u=n.y,x=i.y,f=a.y,h=c<l?c<s?c:s:l<s?l:s,y=u<x?u<f?u:f:x<f?x:f,b=c>l?c>s?c:s:l>s?l:s,w=u>x?u>f?u:f:x>f?x:f,H=F(h,y,t,r,o),k=F(b,w,t,r,o),v=e.prevZ,d=e.nextZ;v&&v.z>=H&&d&&d.z<=k;){if(v.x>=h&&v.x<=b&&v.y>=y&&v.y<=w&&v!==n&&v!==a&&D(c,u,l,x,s,f,v.x,v.y)&&m(v.prev,v,v.next)>=0||(v=v.prevZ,d.x>=h&&d.x<=b&&d.y>=y&&d.y<=w&&d!==n&&d!==a&&D(c,u,l,x,s,f,d.x,d.y)&&m(d.prev,d,d.next)>=0))return!1;d=d.nextZ}for(;v&&v.z>=H;){if(v.x>=h&&v.x<=b&&v.y>=y&&v.y<=w&&v!==n&&v!==a&&D(c,u,l,x,s,f,v.x,v.y)&&m(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;d&&d.z<=k;){if(d.x>=h&&d.x<=b&&d.y>=y&&d.y<=w&&d!==n&&d!==a&&D(c,u,l,x,s,f,d.x,d.y)&&m(d.prev,d,d.next)>=0)return!1;d=d.nextZ}return!0}function de(e,t,r){var o=e;do{var n=o.prev,i=o.next.next;!T(n,i)&&Y(n,o,o.next,i)&&C(n,i)&&C(i,n)&&(t.push(n.i/r|0),t.push(o.i/r|0),t.push(i.i/r|0),_(o),_(o.next),o=e=i),o=o.next}while(o!==e);return g(o)}function xe(e,t,r,o,n,i){var a=e;do{for(var c=a.next.next;c!==a.prev;){if(a.i!==c.i&&Me(a,c)){var l=K(a,c);a=g(a,a.next),l=g(l,l.next),I(a,t,r,o,n,i,0),I(l,t,r,o,n,i,0);return}c=c.next}a=a.next}while(a!==e)}function ye(e,t,r,o){var n=[],i,a,c,l,s;for(i=0,a=t.length;i<a;i++)c=t[i]*o,l=i<a-1?t[i+1]*o:e.length,s=j(e,c,l,o,!1),s===s.next&&(s.steiner=!0),n.push(we(s));for(n.sort(me),i=0;i<n.length;i++)r=he(n[i],r);return r}function me(e,t){return e.x-t.x}function he(e,t){var r=pe(e,t);if(!r)return t;var o=K(r,e);return g(o,o.next),g(r,r.next)}function pe(e,t){var r=t,o=e.x,n=e.y,i=-1/0,a;do{if(n<=r.y&&n>=r.next.y&&r.next.y!==r.y){var c=r.x+(n-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(c<=o&&c>i&&(i=c,a=r.x<r.next.x?r:r.next,c===o))return a}r=r.next}while(r!==t);if(!a)return null;var l=a,s=a.x,u=a.y,x=1/0,f;r=a;do o>=r.x&&r.x>=s&&o!==r.x&&D(n<u?o:i,n,s,u,n<u?i:o,n,r.x,r.y)&&(f=Math.abs(n-r.y)/(o-r.x),C(r,e)&&(f<x||f===x&&(r.x>a.x||r.x===a.x&&ge(a,r)))&&(a=r,x=f)),r=r.next;while(r!==l);return a}function ge(e,t){return m(e.prev,e,t.prev)<0&&m(t.next,e,e.next)<0}function De(e,t,r,o){var n=e;do n.z===0&&(n.z=F(n.x,n.y,t,r,o)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==e);n.prevZ.nextZ=null,n.prevZ=null,be(n)}function be(e){var t,r,o,n,i,a,c,l,s=1;do{for(r=e,e=null,i=null,a=0;r;){for(a++,o=r,c=0,t=0;t<s&&(c++,o=o.nextZ,!!o);t++);for(l=s;c>0||l>0&&o;)c!==0&&(l===0||!o||r.z<=o.z)?(n=r,r=r.nextZ,c--):(n=o,o=o.nextZ,l--),i?i.nextZ=n:e=n,n.prevZ=i,i=n;r=o}i.nextZ=null,s*=2}while(a>1);return e}function F(e,t,r,o,n){return e=(e-r)*n|0,t=(t-o)*n|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function we(e){var t=e,r=e;do(t.x<r.x||t.x===r.x&&t.y<r.y)&&(r=t),t=t.next;while(t!==e);return r}function D(e,t,r,o,n,i,a,c){return(n-a)*(t-c)>=(e-a)*(i-c)&&(e-a)*(o-c)>=(r-a)*(t-c)&&(r-a)*(i-c)>=(n-a)*(o-c)}function Me(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Ie(e,t)&&(C(e,t)&&C(t,e)&&Ce(e,t)&&(m(e.prev,e,t.prev)||m(e,t.prev,t))||T(e,t)&&m(e.prev,e,e.next)>0&&m(t.prev,t,t.next)>0)}function m(e,t,r){return(t.y-e.y)*(r.x-t.x)-(t.x-e.x)*(r.y-t.y)}function T(e,t){return e.x===t.x&&e.y===t.y}function Y(e,t,r,o){var n=P(m(e,t,r)),i=P(m(e,t,o)),a=P(m(r,o,e)),c=P(m(r,o,t));return!!(n!==i&&a!==c||n===0&&S(e,r,t)||i===0&&S(e,o,t)||a===0&&S(r,e,o)||c===0&&S(r,t,o))}function S(e,t,r){return t.x<=Math.max(e.x,r.x)&&t.x>=Math.min(e.x,r.x)&&t.y<=Math.max(e.y,r.y)&&t.y>=Math.min(e.y,r.y)}function P(e){return e>0?1:e<0?-1:0}function Ie(e,t){var r=e;do{if(r.i!==e.i&&r.next.i!==e.i&&r.i!==t.i&&r.next.i!==t.i&&Y(r,r.next,e,t))return!0;r=r.next}while(r!==e);return!1}function C(e,t){return m(e.prev,e,e.next)<0?m(e,t,e.next)>=0&&m(e,e.prev,t)>=0:m(e,t,e.prev)<0||m(e,e.next,t)<0}function Ce(e,t){var r=e,o=!1,n=(e.x+t.x)/2,i=(e.y+t.y)/2;do r.y>i!=r.next.y>i&&r.next.y!==r.y&&n<(r.next.x-r.x)*(i-r.y)/(r.next.y-r.y)+r.x&&(o=!o),r=r.next;while(r!==e);return o}function K(e,t){var r=new A(e.i,e.x,e.y),o=new A(t.i,t.x,t.y),n=e.next,i=t.prev;return e.next=t,t.prev=e,r.next=n,n.prev=r,o.next=r,r.prev=o,i.next=o,o.prev=i,o}function V(e,t,r,o){var n=new A(e,t,r);return o?(n.next=o.next,n.prev=o,o.next.prev=n,o.next=n):(n.prev=n,n.next=n),n}function _(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function A(e,t,r){this.i=e,this.x=t,this.y=r,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}z.deviation=function(e,t,r,o){var n=t&&t.length,i=n?t[0]*r:e.length,a=Math.abs(B(e,0,i,r));if(n)for(var c=0,l=t.length;c<l;c++){var s=t[c]*r,u=c<l-1?t[c+1]*r:e.length;a-=Math.abs(B(e,s,u,r))}var x=0;for(c=0;c<o.length;c+=3){var f=o[c]*r,h=o[c+1]*r,y=o[c+2]*r;x+=Math.abs((e[f]-e[y])*(e[h+1]-e[f+1])-(e[f]-e[h])*(e[y+1]-e[f+1]))}return a===0&&x===0?0:Math.abs((x-a)/a)};function B(e,t,r,o){for(var n=0,i=t,a=r-o;i<r;i+=o)n+=(e[a]-e[i])*(e[i+1]+e[a+1]),a=i;return n}z.flatten=function(e){for(var t=e[0][0].length,r={vertices:[],holes:[],dimensions:t},o=0,n=0;n<e.length;n++){for(var i=0;i<e[n].length;i++)for(var a=0;a<t;a++)r.vertices.push(e[n][i][a]);n>0&&(o+=e[n-1].length,r.holes.push(o))}return r};new $;new $;var W;(e=>{function t(n){let i=n.slice();return i.sort(e.POINT_COMPARATOR),e.makeHullPresorted(i)}e.makeHull=t;function r(n){if(n.length<=1)return n.slice();let i=[];for(let c=0;c<n.length;c++){const l=n[c];for(;i.length>=2;){const s=i[i.length-1],u=i[i.length-2];if((s.x-u.x)*(l.y-u.y)>=(s.y-u.y)*(l.x-u.x))i.pop();else break}i.push(l)}i.pop();let a=[];for(let c=n.length-1;c>=0;c--){const l=n[c];for(;a.length>=2;){const s=a[a.length-1],u=a[a.length-2];if((s.x-u.x)*(l.y-u.y)>=(s.y-u.y)*(l.x-u.x))a.pop();else break}a.push(l)}return a.pop(),i.length==1&&a.length==1&&i[0].x==a[0].x&&i[0].y==a[0].y?i:i.concat(a)}e.makeHullPresorted=r;function o(n,i){return n.x<i.x?-1:n.x>i.x?1:n.y<i.y?-1:n.y>i.y?1:0}e.POINT_COMPARATOR=o})(W||(W={}));export{Oe as P};
