const bucketWidth = 100;
const bucketHeight = 50;
const bucketSpacing = 20;
const bucketFill = "gray";
const textFill = "white";

function createHashMapBuckets(bucketCount) {
    console.log("Creating hash map buckets with count:", bucketCount);
    const hashMapContainer = d3.select("#hashmap-visual")
        .append("svg")
        .attr("width", (bucketWidth + bucketSpacing) * bucketCount)
        .attr("height", bucketHeight + 100);

    const buckets = d3.range(bucketCount).map(i => ({
        x: i * (bucketWidth + bucketSpacing),
        y: 50,
        width: bucketWidth,
        height: bucketHeight,
        index: i
    }));

    hashMapContainer.selectAll("rect.bucket")
        .data(buckets)
        .enter()
        .append("rect")
        .attr("class", "bucket")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("width", d => d.width)
        .attr("height", d => d.height)
        .attr("fill", bucketFill)
        .attr("stroke", "black");

    hashMapContainer.selectAll("text.index")
        .data(buckets)
        .enter()
        .append("text")
        .attr("class", "index")
        .attr("x", d => d.x + bucketWidth / 2)
        .attr("y", d => d.y + bucketHeight / 2)
        .attr("dy", ".35em")
        .attr("fill", textFill)
        .attr("text-anchor", "middle")
        .text(d => `Bucket ${d.index}`);
}

function addToHashMap(hashMap, key, value) {
    const bucketIndex = hashFunction(key, hashMap.length);
    hashMap[bucketIndex].push({ key, value });
    console.log(`Added key: ${key}, value: ${value} to bucket: ${bucketIndex}`);
}

function hashFunction(key, bucketCount) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash * 31 + key.charCodeAt(i)) % bucketCount;
    }
    return hash;
}

function createHashMapVisualization(arr) {
    console.log("Creating hash map visualization with array:", arr);
    const bucketCount = 10;
    const hashMap = Array.from({ length: bucketCount }, () => []);

    arr.forEach((item, index) => {
        addToHashMap(hashMap, item.toString(), item);
    });

    createHashMapBuckets(bucketCount);

    const hashMapContainer = d3.select("#hashmap-visual svg");

    hashMap.forEach((bucket, bucketIndex) => {
        bucket.forEach((entry, entryIndex) => {
            hashMapContainer.append("text")
                .attr("x", bucketIndex * (bucketWidth + bucketSpacing) + bucketWidth / 2)
                .attr("y", 100 + entryIndex * 20)
                .attr("fill", textFill)
                .attr("text-anchor", "middle")
                .text(`${entry.key}: ${entry.value}`);
        });
    });
}
