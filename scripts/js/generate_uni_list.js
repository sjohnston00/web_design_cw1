let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
    if (this.readyState === 4 && this.status === 200) {
        const json = JSON.parse(xmlhttp.responseText);


        // Increment counters for chart generation
        for (let entry in json) {
            if (json.hasOwnProperty(entry)) {
                // Get keys/columns
                transport = json[entry].transport;

            }

            const values = ["train", "taxi", "bus", "hotel ", "hostel ", "camping ", "pool", "voucher", "safe"];
            for (let value in values) {

                // Define table rows
                const node = document.createElement("tr");
                const subNode1 = document.createElement("td");
                const textNode1 = document.createTextNode(values[value]);
                const subNode2 = document.createElement("td");
                const subSubNode = document.createElement("canvas");

                subNode1.appendChild(textNode1);
                subNode2.appendChild(subSubNode);

                // Set canvas attributes
                const att1 = subSubNode.setAttribute("id", values[value]);
                const att2 = subSubNode.setAttribute("width", "800");
                const att3 = subSubNode.setAttribute("height", "25");

                // Nest child nodes in parent node
                node.appendChild(subNode1);
                node.appendChild(subNode2);

                // Nest all nodes in parent table element
                document.getElementById("chart").appendChild(node);

                // Create bars
                const canvas = document.getElementById(values[value]);
                const bar = canvas.getContext("2d");

                let length = 0;
                switch (values[value]) {
                    case "train":
                        length = trainCount;
                        break;
                    case "taxi":
                        length = taxiCount;
                        break;
                    case "bus":
                        length = busCount;
                        break;
                    case "hotel ":
                        length = hotelCount;
                        break;
                    case "hostel ":
                        length = hostelCount;
                        break;
                    case "camping ":
                        length = campingCount;
                        break;
                    case "pool":
                        length = poolCount;
                        break;
                    case "voucher":
                        length = voucherCount;
                        break;
                    case "safe":
                        length = safeCount;
                        break;
                    default:
                        console.log(`Error: is value the correct string? - ${values[value]}`);
                }

                if (length > 0) {
                    if (length > 100) length = 100;
                    bar.fillStyle = "#ffd323";
                }

                bar.rect(1, 1, 20 * length, 100);
                bar.fill();
                // bar.stroke();

                // Nest children in parent node
                node.appendChild(subNode1);
                node.appendChild(subNode2);
            }
        }
    }
    xmlhttp.open("GET", "php/retrieve_survey_data.php", true);
    xmlhttp.send();