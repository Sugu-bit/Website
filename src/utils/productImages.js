import fileCatalog from "../data/files.json";

const productImages = new Map(
  fileCatalog.map(({ productId, imageUrl }) => [Number(productId), imageUrl])
);

export default function getProductImageUrl(productId) {
  return productImages.get(Number(productId));
}
