const assert = require("assert");
const code = require("../lib/utilities");

describe("Utilities", () => {
    describe("#_sheetsToMappedObject", ()=>{
        it("converts a google sheets response to a mapped object", ()=>{
            const fixture = {
                "spreadsheetId": "10SUCLi3IhEfbDYzEyJ5a4YyqdSyV5u_SpGYhrWzybr8",
                "valueRanges": [{
                    "range": "'Project Submissions'!A2:B4",
                    "majorDimension": "ROWS",
                    "values": [
                        [
                            "10/17/2017 12:11:21",
                            "17"
                        ],
                        [
                            "10/17/2017 12:12:18",
                            "15"
                        ],
                        [
                            "10/17/2017 13:02:11",
                            "7"
                        ]
                    ]
                },{
                    "range": "'Project Submissions'!C2:C3",
                    "majorDimension": "ROWS",
                    "values": [
                        [
                            "Kevin Kingdon"
                        ],
                        [
                            "Jay Farnsworth"
                        ]
                    ]
                }]
            };
            assert.deepEqual(code._sheetsToMappedObject([{
                label: "submissions",
                mapping: ["date", "id"]
            },{
                label: "people",
                mapping: ["name"]
            }], fixture), {
                submissions: [{
                    date: "10/17/2017 12:11:21",
                    id: "17",
                },{
                    date: "10/17/2017 12:12:18",
                    id: "15",
                },{
                    date: "10/17/2017 13:02:11",
                    id: "7",
                }],
                people: [{
                    name: "Kevin Kingdon"
                },{
                    name: "Jay Farnsworth"
                }]
            });
        });
    });

    describe("#_rowToMap", ()=>{
        it("converts a google sheets array to an object", ()=>{
            const result = code._rowToMap(["keyOne", "keyTwo"], ["valueOne", "valueTwo"]);
            assert.deepEqual(result, {
                keyOne: "valueOne",
                keyTwo: "valueTwo"
            });
        });
        it("returns an empty object if there are no keys", ()=>{
            assert.deepEqual(code._rowToMap([], ["valueOne", "valueTwo"]), {});
            assert.deepEqual(code._rowToMap(null, ["valueOne", "valueTwo"]), {});
        });
        it("returns an empty object if there are no values", ()=>{
            assert.deepEqual(code._rowToMap(["keyOne", "keyTwo"], []), {});
            assert.deepEqual(code._rowToMap(["keyOne", "keyTwo"], null), {});
        });
        it("returns an empty object if there are no keys or values", ()=>{
            assert.deepEqual(code._rowToMap([], []), {});
            assert.deepEqual(code._rowToMap([], null), {});
            assert.deepEqual(code._rowToMap(null, []), {});
            assert.deepEqual(code._rowToMap(null, null), {});
        });
    });

    describe("#_rowsToMaps", ()=>{
        it("converts rows to maps", ()=>{
            assert.deepEqual(code._rowsToMaps(["one", "two"], [[1, 2], [3, 4]]), [{one: 1, two: 2}, {one: 3, two: 4}]);
        });
        it("returns empty objects if the row doesn't have values", ()=>{
            assert.deepEqual(code._rowsToMaps([], [[], []]), [{}, {}]);
        });
    });

    describe("#_getRanges", ()=>{
        it("can extract ranges from row objects", ()=>{
            assert.deepEqual(code._getRanges([{
                range: "A2:B",
            },{
                range: "'Cities'!C2:C",
            }]), ["A2:B", "'Cities'!C2:C"]);
        });
    });
});
