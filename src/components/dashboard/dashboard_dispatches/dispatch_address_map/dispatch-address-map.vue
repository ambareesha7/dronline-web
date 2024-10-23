<template>
  <gmap-map
    class="DispatchAddressMap__wrapper"
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
</template>

<script>

export default {
  name: 'DispatchAddressMap',

  props: {
    address: {
      required: true,
      type: String
    }
  },

  data() {
    return {
      options: {
        disableDefaultUI: false
      },
      position: {
        lat: 0,
        lng: 0
      },
      zoom: 13,
      markers: []
    };
  },

  async mounted() {
    await this.$refs.map.$mapPromise;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { address: this.address },
      (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          this.position = { lat, lng };
          this.addMarker('patient', this.position);
        }
      }
    );
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        this.addMarker('current', {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setTimeout(() => this.fitBounds(), 600);
      }, () => {}, { timeout: 5000 });
    }
  },

  methods: {
    addMarker(type, position) {
      this.markers.push({
        position,
        icon: {
          url: `/static/images/${type === 'patient' ? 'green' : 'blue'}-marker.png`,
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
  @import "dispatch-address-map.scss";
</style>
