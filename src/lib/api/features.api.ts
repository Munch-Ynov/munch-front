import {
  RestaurantFeature,
  RestaurantFeatureWithCategory,
} from "@/models/restaurant-feature.model";
import { api } from "./api";
import { Category, CategoryWithFeatures } from "@/models/category.model";

const prefix = "features";

async function getFeatures() {
  return api<RestaurantFeatureWithCategory[]>({ url: prefix, method: "GET" });
}

async function getFeature(id: string) {
  return api<RestaurantFeature>({ url: `${prefix}/${id}`, method: "GET" });
}

async function updateFeature(id: string, feature: RestaurantFeature) {
  return api<RestaurantFeature>({
    url: `${prefix}/${id}`,
    method: "PATCH",
    body: feature,
  });
}

async function deleteFeature(id: string) {
  return api<null>({ url: `${prefix}/${id}`, method: "DELETE" });
}

export default {
  getFeatures,
  getFeature,
  updateFeature,
  deleteFeature,
};
