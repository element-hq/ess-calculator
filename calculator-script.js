// SCRIPT FOR ESS SIZING CALCULATOR (WIP) - HAS TO BE HERE APPARENTLY
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('bkmrk-calcForm');

    if (form) {
        window.onload = calculate();
        // Get input fields and attach input event listeners
        // DEPLOYMENT
        document.getElementById('bkmrk-heading-deployment').addEventListener('click', heading);
        document.getElementById('bkmrk-deployment-type').addEventListener('input', calculate);
        document.getElementById('bkmrk-federation-type').addEventListener('input', calculate);
        document.getElementById('bkmrk-mau').addEventListener('input', calculate);
        document.getElementById('bkmrk-avg-media-size').addEventListener('input', calculate);
        document.getElementById('bkmrk-avg-media-per-day-per-user').addEventListener('input', calculate);
        document.getElementById('bkmrk-retention').addEventListener('input', calculate);
        document.getElementById('bkmrk-days-media-retention').addEventListener('input', calculate);
        // BASE
        document.getElementById('bkmrk-heading-base').addEventListener('click', heading);
        document.getElementById('bkmrk-microk8s').addEventListener('input', calculate);
        document.getElementById('bkmrk-synapseadminui').addEventListener('input', calculate);
        document.getElementById('bkmrk-elementweb').addEventListener('input', calculate);
        document.getElementById('bkmrk-wellknowndelegation').addEventListener('input', calculate);
        document.getElementById('bkmrk-synapse').addEventListener('input', calculate);
        // VOIP
        document.getElementById('bkmrk-heading-voip').addEventListener('click', heading);
        document.getElementById('bkmrk-jitsi').addEventListener('input', calculate);
        document.getElementById('bkmrk-elementcall').addEventListener('input', calculate);
        document.getElementById('bkmrk-livekit').addEventListener('input', calculate);
        // ElementX
        document.getElementById('bkmrk-heading-elementx').addEventListener('click', heading);
        document.getElementById('bkmrk-matrixauthenticationservice').addEventListener('input', calculate);
        document.getElementById('bkmrk-slidingsync').addEventListener('input', calculate);
        // Auditing
        document.getElementById('bkmrk-heading-auditing').addEventListener('click', heading);
        document.getElementById('bkmrk-auditbot').addEventListener('input', calculate);
        document.getElementById('bkmrk-adminbot').addEventListener('input', calculate);
        // Data Sov
        document.getElementById('bkmrk-heading-data').addEventListener('click', heading);
        document.getElementById('bkmrk-sydent').addEventListener('input', calculate);
        document.getElementById('bkmrk-securebordergateway').addEventListener('input', calculate);
        document.getElementById('bkmrk-matrixcontentscanner').addEventListener('input', calculate);
        document.getElementById('bkmrk-sygnal').addEventListener('input', calculate);
        // Integrations
        document.getElementById('bkmrk-heading-integrations').addEventListener('click', heading);
        document.getElementById('bkmrk-hookshot').addEventListener('input', calculate);
        document.getElementById('bkmrk-groupsync').addEventListener('input', calculate);
        document.getElementById('bkmrk-integrator').addEventListener('input', calculate);
        // Bridges
        document.getElementById('bkmrk-heading-bridges').addEventListener('click', heading);
        document.getElementById('bkmrk-sipbridge').addEventListener('input', calculate);
        document.getElementById('bkmrk-bifrost').addEventListener('input', calculate);
        document.getElementById('bkmrk-ircbridge').addEventListener('input', calculate);
        document.getElementById('bkmrk-mautrixtelegram').addEventListener('input', calculate);
        document.getElementById('bkmrk-skypeforbusinessbridge').addEventListener('input', calculate);
        document.getElementById('bkmrk-mautrixwhatsapp').addEventListener('input', calculate);
        // Min Resources
        document.getElementById('bkmrk-heading-calcres').addEventListener('click', heading);
        // Rec Resources
        // document.getElementById('bkmrk-heading-minres').addEventListener('click', heading);
        // Rec Postgres
        // document.getElementById('bkmrk-heading-postgresrec').addEventListener('click', heading);

        function heading(event) {
            // HANDLE TOGGLES
            const buttonId = event.target.id;
            if (buttonId == 'bkmrk-heading-deployment') {
                document.getElementById('bkmrk-section-deployment').classList.toggle('hideme');
            } else if (buttonId == 'bkmrk-heading-base') {
                document.getElementById('bkmrk-section-base').classList.toggle('hideme');
            } else if (buttonId == 'bkmrk-heading-voip') {
                document.getElementById('bkmrk-section-voip').classList.toggle('hideme');
            } else if (buttonId == 'bkmrk-heading-elementx') {
                document.getElementById('bkmrk-section-elementx').classList.toggle('hideme');
            } else if (buttonId == 'bkmrk-heading-auditing') {
                document.getElementById('bkmrk-section-auditing').classList.toggle('hideme');
            } else if (buttonId == 'bkmrk-heading-data') {
                document.getElementById('bkmrk-section-data').classList.toggle('hideme');
            } else if (buttonId == 'bkmrk-heading-integrations') {
                document.getElementById('bkmrk-section-integrations').classList.toggle('hideme');
            } else if (buttonId == 'bkmrk-heading-bridges') {
                document.getElementById('bkmrk-section-bridges').classList.toggle('hideme');
            } else if (buttonId == 'bkmrk-heading-calcres') {
                document.getElementById('bkmrk-section-calcres').classList.toggle('hideme');
            } else if (buttonId == 'bkmrk-heading-minres') {
                document.getElementById('bkmrk-section-minres').classList.toggle('hideme');
            } else if (buttonId == 'bkmrk-heading-postgresrec') {
                document.getElementById('bkmrk-section-postgresrec').classList.toggle('hideme');
            }
        }

        function calculate() {
            // DEPLOYMENT
            let deployment_type = parseFloat(document.getElementById('bkmrk-deployment-type').value) || 0;
            let federation_type = parseFloat(document.getElementById('bkmrk-federation-type').value) || 0;
            let mau = parseFloat(document.getElementById('bkmrk-mau').value) || 1;
            let avg_media_size = parseFloat(document.getElementById('bkmrk-avg-media-size').value) || 0;
            let avg_media_per_day_per_user = parseFloat(document.getElementById('bkmrk-avg-media-per-day-per-user').value) || 0;
            let retention = parseFloat(document.getElementById('bkmrk-retention').value) || 0;
            let days_media_retention = parseFloat(document.getElementById('bkmrk-days-media-retention').value) || 0;
            // BASE
            let microk8s = parseFloat(document.getElementById('bkmrk-microk8s').value) || 0;
            let synapseadminui = parseFloat(document.getElementById('bkmrk-synapseadminui').value) || 0;
            let elementweb = parseFloat(document.getElementById('bkmrk-elementweb').value) || 0;
            let wellknowndelegation = parseFloat(document.getElementById('bkmrk-wellknowndelegation').value) || 0;
            let synapse = parseFloat(document.getElementById('bkmrk-synapse').value) || 0;
            // VOIP
            let jitsi = parseFloat(document.getElementById('bkmrk-jitsi').value) || 0;
            let elementcall = parseFloat(document.getElementById('bkmrk-elementcall').value) || 0;
            let livekit = parseFloat(document.getElementById('bkmrk-livekit').value) || 0;
            // ElementX
            let matrixauthenticationservice = parseFloat(document.getElementById('bkmrk-matrixauthenticationservice').value) || 0;
            let slidingsync = parseFloat(document.getElementById('bkmrk-slidingsync').value) || 0;
            // Auditing
            let auditbot = parseFloat(document.getElementById('bkmrk-auditbot').value) || 0;
            let adminbot = parseFloat(document.getElementById('bkmrk-adminbot').value) || 0;
            // Data Sov
            let sydent = parseFloat(document.getElementById('bkmrk-sydent').value) || 0;
            let securebordergateway = parseFloat(document.getElementById('bkmrk-securebordergateway').value) || 0;
            let matrixcontentscanner = parseFloat(document.getElementById('bkmrk-matrixcontentscanner').value) || 0;
            let sygnal = parseFloat(document.getElementById('bkmrk-sygnal').value) || 0;
            // Integrations
            let hookshot = parseFloat(document.getElementById('bkmrk-hookshot').value) || 0;
            let groupsync = parseFloat(document.getElementById('bkmrk-groupsync').value) || 0;
            let integrator = parseFloat(document.getElementById('bkmrk-integrator').value) || 0;
            // Bridges
            let sipbridge = parseFloat(document.getElementById('bkmrk-sipbridge').value) || 0;
            let bifrost = parseFloat(document.getElementById('bkmrk-bifrost').value) || 0;
            let ircbridge = parseFloat(document.getElementById('bkmrk-ircbridge').value) || 0;
            let mautrixtelegram = parseFloat(document.getElementById('bkmrk-mautrixtelegram').value) || 0;
            let skypeforbusinessbridge = parseFloat(document.getElementById('bkmrk-skypeforbusinessbridge').value) || 0;
            let mautrixwhatsapp = parseFloat(document.getElementById('bkmrk-mautrixwhatsapp').value) || 0;

            var mau_index = 0

            // DISPLAY MAU RANGE
            if (mau > 0 && mau <= 500) {
                mau_index = 0
                document.getElementById('bkmrk-mau-result').value = '1-500';
            } else if (mau > 500 && mau <= 2500) {
                mau_index = 1
                document.getElementById('bkmrk-mau-result').value = '501-2500';
            } else if (mau > 2500) {
                mau_index = 2
                document.getElementById('bkmrk-mau-result').value = '2501-10000';
            } else if (mau === 0) {
                mau = 1;
                mau_index = 0
                document.getElementById('bkmrk-mau').value = 1;
                document.getElementById('bkmrk-mau-result').value = '1-500';
                window.onload = calculate();
            } else {
                mau = 1
                mau_index = 0
                document.getElementById('bkmrk-mau').value = 1;
                window.onload = calculate();
            }

            // DISPLAY / UNLOCK RETENTION CONFIG  
            if (retention == 0) {
                document.getElementById('bkmrk-days-media-retention').setAttribute('readonly', true);
            } else {
                document.getElementById('bkmrk-days-media-retention').removeAttribute('readonly');
                if (days_media_retention == 0) {
                    document.getElementById('bkmrk-days-media-retention').value = 1;
                    window.onload = calculate();
                }
            }

            // SET `microk8s` if Standalone
            if (deployment_type != 2) {
                if (microk8s != 1) {
                    document.getElementById('bkmrk-microk8s').value = 1;
                    window.onload = calculate();
                }
            } else {
                if (microk8s != 0) {
                    document.getElementById('bkmrk-microk8s').value = 0;
                    window.onload = calculate();
                }
            }

            // SET `livekit` true if using Element Call
            if (elementcall == 0) {
                if (livekit != 0) {
                    document.getElementById('bkmrk-livekit').value = 0
                    window.onload = calculate();
                }
            } else {
                if (livekit != 1) {
                    document.getElementById('bkmrk-livekit').value = 1
                    window.onload = calculate();
                }
            }

            // DETERMINE VALUES
            // MEM/CPU/MEM-LIMITS
            const microk8s_mem = 2000;
            const microk8s_cpu = 1;

            const elementweb_mem = 50;
            const elementweb_cpu = 0.05;
            const elementweb_mem_limit = 200;
            const matrixcontentscanner_mem = 300;
            const matrixcontentscanner_cpu = 0.3;
            const matrixcontentscanner_mem_limit = 5500;
            const slidingsync_mem = 400;
            const slidingsync_cpu = 0.2;
            const slidingsync_mem_limit = 8000;
            const synapse_mem = 350;
            const synapse_cpu = 0.35;
            const synapse_mem_limit = 8250;
            const wellknowndelegation_mem = 50;
            const wellknowndelegation_cpu = 0.05;
            const wellknowndelegation_mem_limit = 200;
            const bifrost_mem = 100;
            const bifrost_cpu = 0.05;
            const bifrost_mem_limit = 1000;
            const coturn_mem = 50;
            const coturn_cpu = 0.05;
            const coturn_mem_limit = 200;
            const elementcall_mem = 50;
            const elementcall_cpu = 0.05;
            const elementcall_mem_limit = 200;
            const groupsync_mem = 150;
            const groupsync_cpu = 0.1;
            const groupsync_mem_limit = 1000;
            const hookshot_mem = 100;
            const hookshot_cpu = 0.1;
            const hookshot_mem_limit = 350;
            const hydrogen_mem = 50;
            const hydrogen_cpu = 0.05;
            const hydrogen_mem_limit = 200;
            const integrator_mem = 300;
            const integrator_cpu = 0.25;
            const integrator_mem_limit = 1150;
            const ircbridge_mem = 150;
            const ircbridge_cpu = 0.1;
            const ircbridge_mem_limit = 1000;
            const jitsi_mem = 950;
            const jitsi_cpu = 0.76;
            const jitsi_mem_limit = 10900;
            const livekit_mem = 220;
            const livekit_cpu = 0.2;
            const livekit_mem_limit = 4070;
            const lowbandwidth_mem = 50;
            const lowbandwidth_cpu = 0.1;
            const lowbandwidth_mem_limit = 100;
            const matrixauthenticationservice_mem = 228;
            const matrixauthenticationservice_cpu = 0.2;
            const matrixauthenticationservice_mem_limit = 478;
            const mautrixtelegram_mem = 150;
            const mautrixtelegram_cpu = 0.05;
            const mautrixtelegram_mem_limit = 1000;
            const mautrixwhatsapp_mem = 150;
            const mautrixwhatsapp_cpu = 0.05;
            const mautrixwhatsapp_mem_limit = 1000;
            const pipe_mem = 200;
            const pipe_cpu = 0.02;
            const pipe_mem_limit = 1200;
            const securebordergateway_mem = 100;
            const securebordergateway_cpu = 0.1;
            const securebordergateway_mem_limit = 200;
            const sipbridge_mem = 150;
            const sipbridge_cpu = 0.05;
            const sipbridge_mem_limit = 1000;
            const skypeforbusinessbridge_mem = 150;
            const skypeforbusinessbridge_cpu = 0.05;
            const skypeforbusinessbridge_mem_limit = 1000;
            const sydent_mem = 100;
            const sydent_cpu = 0.05;
            const sydent_mem_limit = 250;
            const sygnal_mem = 100;
            const sygnal_cpu = 0.05;
            const sygnal_mem_limit = 250;
            const synapseadminui_mem = 50;
            const synapseadminui_cpu = 0.05;
            const synapseadminui_mem_limit = 500;

            var synapse_worker_count = 0;
            var synapse_worker_cpu = 0;
            var synapse_worker_mem = 0;
            if (federation_type == 0) {
                if (mau_index == 0) {
                    synapse_worker_count = 0;
                }
                if (mau_index == 1) {
                    synapse_worker_count = 5;
                }
                if (mau_index == 2) {
                    synapse_worker_count = 9;
                }
            }
            if (federation_type == 1) {
                if (mau_index == 0) {
                    synapse_worker_count = 1;
                }
                if (mau_index == 1) {
                    synapse_worker_count = 5;
                }
                if (mau_index == 2) {
                    synapse_worker_count = 9;
                }
            }
            if (federation_type == 2) {
                if (mau_index == 0) {
                    synapse_worker_count = 4;
                }
                if (mau_index == 1) {
                    synapse_worker_count = 8;
                }
                if (mau_index == 2) {
                    synapse_worker_count = 14;
                }
            }

            var total_vcpu = 0;
            var total_mem = 0;
            var postgres_total_vcpu = 0;
            var postgres_total_mem = 0;

            synapse_worker_cpu = synapse_cpu * synapse_worker_count;
            synapse_worker_mem = synapse_mem * synapse_worker_count;

            total_vcpu = total_vcpu + synapse_worker_cpu;
            total_mem = total_mem + synapse_worker_mem;

            // BASE
            if (synapseadminui == 1) {
                total_vcpu = total_vcpu + synapseadminui_cpu;
                total_mem = total_mem + synapseadminui_mem;
            }
            if (elementweb == 1) {
                total_vcpu = total_vcpu + elementweb_cpu;
                total_mem = total_mem + elementweb_mem;
            }
            if (wellknowndelegation == 1) {
                total_vcpu = total_vcpu + wellknowndelegation_cpu;
                total_mem = total_mem + wellknowndelegation_mem;
            }
            if (synapse == 1) {
                total_vcpu = total_vcpu + synapse_cpu;
                total_mem = total_mem + synapse_mem;
                // Handle Postgres In Cluster
                if (deployment_type == 0) {
                    postgres_total_vcpu = postgres_total_vcpu + 0;
                    postgres_total_mem = postgres_total_mem + 100;
                }
            }
            // VOIP
            if (jitsi == 1) {
                total_vcpu = total_vcpu + jitsi_cpu;
                total_mem = total_mem + jitsi_mem;
            }
            if (elementcall == 1) {
                total_vcpu = total_vcpu + elementcall_cpu;
                total_mem = total_mem + elementcall_mem;
            }
            if (livekit == 1) {
                total_vcpu = total_vcpu + livekit_cpu;
                total_mem = total_mem + livekit_mem;
            }
            // ElementX
            if (matrixauthenticationservice == 1) {
                total_vcpu = total_vcpu + matrixauthenticationservice_cpu;
                total_mem = total_mem + matrixauthenticationservice_mem;
                // Handle Postgres In Cluster
                if (deployment_type == 0) {
                    postgres_total_vcpu = postgres_total_vcpu + 0;
                    postgres_total_mem = postgres_total_mem + 100;
                }
            }
            if (slidingsync == 1) {
                total_vcpu = total_vcpu + slidingsync_cpu;
                total_mem = total_mem + slidingsync_mem;
                // Handle Postgres In Cluster
                if (deployment_type == 0) {
                    postgres_total_vcpu = postgres_total_vcpu + 0;
                    postgres_total_mem = postgres_total_mem + 100;
                }
            }
            // Auditing
            if (auditbot == 1) {
                total_vcpu = total_vcpu + pipe_cpu;
                total_mem = total_mem + pipe_mem;
            }
            if (adminbot == 1) {
                total_vcpu = total_vcpu + pipe_cpu;
                total_mem = total_mem + pipe_mem;
            }
            // Data Sov
            if (sydent == 1) {
                total_vcpu = total_vcpu + sydent_cpu;
                total_mem = total_mem + sydent_mem;
            }
            if (securebordergateway == 1) {
                total_vcpu = total_vcpu + securebordergateway_cpu;
                total_mem = total_mem + securebordergateway_mem;
            }
            if (matrixcontentscanner == 1) {
                total_vcpu = total_vcpu + matrixcontentscanner_cpu;
                total_mem = total_mem + matrixcontentscanner_mem;
            }
            if (sygnal == 1) {
                total_vcpu = total_vcpu + sygnal_cpu;
                total_mem = total_mem + sygnal_mem;
            }
            // Integrations
            if (hookshot == 1) {
                total_vcpu = total_vcpu + hookshot_cpu;
                total_mem = total_mem + hookshot_mem;
            }
            if (groupsync == 1) {
                total_vcpu = total_vcpu + groupsync_cpu;
                total_mem = total_mem + groupsync_mem;
            }
            if (integrator == 1) {
                total_vcpu = total_vcpu + integrator_cpu;
                total_mem = total_mem + integrator_mem;
                // Handle Postgres In Cluster
                if (deployment_type == 0) {
                    postgres_total_vcpu = postgres_total_vcpu + 0;
                    postgres_total_mem = postgres_total_mem + 100;
                }
            }
            // Bridges
            if (sipbridge == 1) {
                total_vcpu = total_vcpu + sipbridge_cpu;
                total_mem = total_mem + sipbridge_mem;
            }
            if (bifrost == 1) {
                total_vcpu = total_vcpu + bifrost_cpu;
                total_mem = total_mem + bifrost_mem;
                // Handle Postgres In Cluster
                if (deployment_type == 0) {
                    postgres_total_vcpu = postgres_total_vcpu + 0;
                    postgres_total_mem = postgres_total_mem + 100;
                }
            }
            if (ircbridge == 1) {
                total_vcpu = total_vcpu + ircbridge_cpu;
                total_mem = total_mem + ircbridge_mem;
                // Handle Postgres In Cluster
                if (deployment_type == 0) {
                    postgres_total_vcpu = postgres_total_vcpu + 0;
                    postgres_total_mem = postgres_total_mem + 100;
                }
            }
            if (mautrixtelegram == 1) {
                total_vcpu = total_vcpu + mautrixtelegram_cpu;
                total_mem = total_mem + mautrixtelegram_mem;
                // Handle Postgres In Cluster
                if (deployment_type == 0) {
                    postgres_total_vcpu = postgres_total_vcpu + 0;
                    postgres_total_mem = postgres_total_mem + 100;
                }
            }
            if (skypeforbusinessbridge == 1) {
                total_vcpu = total_vcpu + skypeforbusinessbridge_cpu;
                total_mem = total_mem + skypeforbusinessbridge_mem;
            }
            if (mautrixwhatsapp == 1) {
                total_vcpu = total_vcpu + mautrixwhatsapp_cpu;
                total_mem = total_mem + mautrixwhatsapp_mem;
                // Handle Postgres In Cluster
                if (deployment_type == 0) {
                    postgres_total_vcpu = postgres_total_vcpu + 0;
                    postgres_total_mem = postgres_total_mem + 100;
                }
            }

            // console.log("mau_index:", mau_index);
            // console.log("fed_index:", federation_type);

            // console.log("total synapse workers:", synapse_worker_count);

            // console.log("total mem is:", total_mem);
            // console.log("total cpu is:", total_vcpu);

            // console.log("deployment_index:", deployment_type);

            // console.log("total postgres-cpu is:", postgres_total_vcpu);
            // console.log("element", (document.getElementById('bkmrk-min-postgres-vcpu').value))

            // console.log("total postgres-mem is:", postgres_total_mem);
            // console.log("element", (document.getElementById('bkmrk-min-postgres-mem').value))

            if (document.getElementById('bkmrk-min-components-vcpu').value != Number(total_vcpu.toFixed(2)) || document.getElementById('bkmrk-min-components-mem').value != Number(total_mem.toFixed(2))) {
                document.getElementById('bkmrk-min-components-vcpu').value = Number(total_vcpu.toFixed(2));
                document.getElementById('bkmrk-min-components-mem').value = Number(total_mem.toFixed(2));
                window.onload = calculate();
            }

            if (deployment_type == 0) {
                if (document.getElementById('bkmrk-min-postgres-vcpu').value != Number(postgres_total_vcpu.toFixed(2)) || document.getElementById('bkmrk-min-postgres-mem').value != Number(postgres_total_mem.toFixed(2))) {
                    document.getElementById('bkmrk-min-postgres-vcpu').value = Number(postgres_total_vcpu.toFixed(2));
                    document.getElementById('bkmrk-min-postgres-mem').value = Number(postgres_total_mem.toFixed(2));
                    window.onload = calculate();
                }
                document.getElementById('bkmrk-min-postgres-1').classList.remove('hideme');
                document.getElementById('bkmrk-min-postgres-2').classList.remove('hideme');
                document.getElementById('bkmrk-min-postgres-3').classList.remove('hideme');
            } else {
                if (document.getElementById('bkmrk-min-postgres-vcpu').value != 0 || document.getElementById('bkmrk-min-postgres-mem').value != 0) {
                    document.getElementById('bkmrk-min-postgres-vcpu').value = 0;
                    document.getElementById('bkmrk-min-postgres-mem').value = 0;
                    window.onload = calculate();
                }
                document.getElementById('bkmrk-min-postgres-1').classList.add('hideme');
                document.getElementById('bkmrk-min-postgres-2').classList.add('hideme');
                document.getElementById('bkmrk-min-postgres-3').classList.add('hideme');
            }

            if (deployment_type != 2) {
                if (document.getElementById('bkmrk-min-microk8s-vcpu').value != Number(microk8s_cpu.toFixed(2)) || document.getElementById('bkmrk-min-microk8s-mem').value != Number(microk8s_mem.toFixed(2))) {
                    document.getElementById('bkmrk-min-microk8s-vcpu').value = Number(microk8s_cpu.toFixed(2));
                    document.getElementById('bkmrk-min-microk8s-mem').value = Number(microk8s_mem.toFixed(2));
                    window.onload = calculate();
                }
                document.getElementById('bkmrk-min-microk8s-1').classList.remove('hideme');
                document.getElementById('bkmrk-min-microk8s-2').classList.remove('hideme');
                document.getElementById('bkmrk-min-microk8s-3').classList.remove('hideme');
            } else {
                if (document.getElementById('bkmrk-min-microk8s-vcpu').value != 0 || document.getElementById('bkmrk-min-microk8s-mem').value != 0) {
                    document.getElementById('bkmrk-min-microk8s-vcpu').value = 0;
                    document.getElementById('bkmrk-min-microk8s-mem').value = 0;
                    window.onload = calculate();
                }
                document.getElementById('bkmrk-min-microk8s-1').classList.add('hideme');
                document.getElementById('bkmrk-min-microk8s-2').classList.add('hideme');
                document.getElementById('bkmrk-min-microk8s-3').classList.add('hideme');
            }

            const operator_rbacproxy_mem = 256
            const operator_rbacproxy_cpu = 0.01
            const operator_rbacproxy_mem_limit = 2000
            const operator_manager_mem = 256
            const operator_manager_cpu = 0.01
            const operator_manager_mem_limit = 2000
            const operator_conversion_webhook_mem = 50
            const operator_conversion_webhook_cpu = 0.01
            const operator_conversion_webhook_ = 128
            const updater_manager_mem = 256
            const updater_manager_cpu = 0.01
            const updater_manager_mem_limit = 2000
            const updater_rbacproxy_mem = 256
            const updater_rbacproxy_cpu = 0.01
            const updater_rbacproxy_mem_limit = 2000
            const updater_conversion_webhook_mem = 50
            const updater_conversion_webhook_cpu = 0.01
            const updater_conversion_webhook_mem_limit = 128

            var total_opup_mem = operator_rbacproxy_mem + operator_manager_mem + operator_conversion_webhook_mem + updater_manager_mem + updater_rbacproxy_mem + updater_conversion_webhook_mem
            var total_opup_cpu = operator_rbacproxy_cpu + operator_manager_cpu + operator_conversion_webhook_cpu + updater_manager_cpu + updater_rbacproxy_cpu + updater_conversion_webhook_cpu

            if (document.getElementById('bkmrk-min-opup-vcpu').value != Number(total_opup_cpu.toFixed(2)) || document.getElementById('bkmrk-min-opup-mem').value != Number(total_opup_mem.toFixed(2))) {
                document.getElementById('bkmrk-min-opup-vcpu').value = Number(total_opup_cpu.toFixed(2));
                document.getElementById('bkmrk-min-opup-mem').value = Number(total_opup_mem.toFixed(2));
                window.onload = calculate();
            }

            var min_total_cpu = total_vcpu + postgres_total_vcpu + total_opup_cpu
            var min_total_mem = total_mem + postgres_total_mem + total_opup_mem

            if (deployment_type != 2) {
                min_total_cpu = min_total_cpu + microk8s_cpu
                min_total_mem = min_total_mem + microk8s_mem
            }

            var rec_total_cpu = min_total_cpu * 1.4
            var rec_total_mem = min_total_mem * 1.4

            if (document.getElementById('bkmrk-min-total-vcpu').value != Number(min_total_cpu.toFixed(2)) || document.getElementById('bkmrk-min-total-mem').value != Number(min_total_mem.toFixed(2))) {
                document.getElementById('bkmrk-min-total-vcpu').value = Number(min_total_cpu.toFixed(2));
                document.getElementById('bkmrk-min-total-mem').value = Number(min_total_mem.toFixed(2));
                window.onload = calculate();
            }

            if (document.getElementById('bkmrk-rec-total-vcpu').value != Number(rec_total_cpu.toFixed(2)) || document.getElementById('bkmrk-rec-total-mem').value != Number(rec_total_mem.toFixed(2))) {
                document.getElementById('bkmrk-rec-total-vcpu').value = Number(rec_total_cpu.toFixed(2));
                document.getElementById('bkmrk-rec-total-mem').value = Number(rec_total_mem.toFixed(2));
                window.onload = calculate();
            }

        }
    }
});