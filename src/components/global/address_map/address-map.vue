<template>
  <div class="AddressMap__wrapper">
    <gmap-map
      class="AddressMap__map"
      :center="position"
      :options="options"
      :zoom="zoom"
      ref="map">
      <gmap-marker
        v-for="(m, index) in markers"
        :position="m.position"
        :icon="m.icon"
        :clickable="false"
        :key="index">
      </gmap-marker>
    </gmap-map>
    <div class="form-row invalidate AddressMap__address">
      <input
        class="form-field filled"
        id="address"
        type="text"
        :value="address || geocodedAddress"/>
      <label
        for="address"
        class="form-label label-inner">
        {{ $t('global.address') }}
      </label>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AddressMap',

  props: {
    address: {
      type: String
    },
    location: {
      type: Object
    }
  },

  data() {
    return {
      options: {
        disableDefaultUI: true
      },
      position: {
        lat: 0,
        lng: 0
      },
      zoom: 13,
      markers: [],
      geocodedAddress: null
    };
  },

  async mounted() {
    await this.$refs.map.$mapPromise;
    const geocoder = new window.google.maps.Geocoder();
    if (this.address) {
      geocoder.geocode(
        { address: this.address },
        (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            this.position = { lat, lng };
            this.addMarker(this.position);
          }
        }
      );
    } else if (this.location) {
      this.position = {
        lat: this.location.lat,
        lng: this.location.lon
      };
      this.addMarker(this.position);
      geocoder.geocode(
        { location: this.position },
        (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            this.geocodedAddress = results[0].formatted_address;
            this.$emit('ongeocode', results[0]);
          }
        }
      );
    }
  },

  methods: {
    addMarker(position) {
      this.markers.push({
        position,
        icon: {
          url: '/static/images/green-marker.png',
          size: new window.google.maps.Size(40, 40),
          origin: new window.google.maps.Point(0, 0),
          scaledSize: new window.google.maps.Size(40, 40)
        }
      });
    },
    fitBounds() {
      if (this.$refs.map) {
        const bounds = new window.google.maps.LatLngBounds();
        this.markers.forEach(marker => {
          bounds.extend(marker.position);
        });
        this.$refs.map.$mapObject.fitBounds(bounds);
      }
    }
  }
};
</script>

<style scoped lang="scss">
  @import "address-map.scss";
</style>
