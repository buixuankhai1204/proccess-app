<script>
    import {page} from '$app/stores'; // Để lấy dữ liệu từ URL query params

    let users = [];
    let steps = []; // Danh sách các step
    let newStep = {actor: null, accept: null, reject: null}; // Step mới sẽ thêm
    let requests = [
        {id: 1, requestName: 'duyet danh muc'},
        {id: 2, requestName: 'duyet chuong trinh'},
    ];
    let selectedRequests = {
        id: null,
        requestName: '',
    };

    function handleRequestClick(request) {
        selectedRequests = {
            id: request.id,
            requestName: request.requestName,
        };
        console.log('Selected request:', selectedRequests); // Log ra giá trị
    }

    // Lấy danh sách users từ URL query params
    $: {
        const urlParams = new URLSearchParams($page.url.search);
        const usersParam = urlParams.get('users');
        if (usersParam) {
            users = JSON.parse(decodeURIComponent(usersParam));
        }
    }

    // Thêm step mới vào danh sách
    function addNewStep() {
        if (!newStep.actor ) {
            alert('Please select both Accepter and Rejecter!');
            return;
        }
        steps = [...steps, {...newStep}];
        console.log(steps);
        newStep = {accept: null, reject: null, actor: null}; // Reset step hiện tại
    }

    async function submitSteps() {
        const stepList = steps; // Get the current list of steps
        try {
            const response = await fetch('http://localhost:3000/step', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({requestId: selectedRequests.id, steps: stepList})
            });

            // @ts-ignore
            if (response.status == 201) {
                const result = await response.json();
                alert('Steps submitted successfully!');
                console.log(result);
            } else {
                alert('Failed to submit steps.');
            }
        } catch (error) {
            console.error('Error submitting steps:', error);
            alert('An error occurred while submitting steps.');
        }
    }
</script>

<style>
    label {
        display: inline-block;
        margin-right: 8px;
    }

    select {
        margin-bottom: 8px;
    }

    button {
        display: inline-block;
        margin-top: 10px;
    }
</style>

<div>
    <h1>Step Management</h1>

    <div>
        {#each requests as request}
            <button on:click={() => handleRequestClick(request)}>{request.requestName}</button>
        {/each}
    </div>
    <!-- Hiển thị danh sách các Step -->
    <h2>Steps:</h2>
    {#if steps.length > 0}
        <ul>
            {#each steps as step, i}
                <li>
                    Step {i + 1}:
                    Actor by {step.actor|| 'None'},
                    Accept by {step.accept || 'None'},
                    Reject by {step.reject || 'None'}
                </li>
            {/each}
        </ul>
    {:else}
        <p>No steps added yet.</p>
    {/if}

    <!-- Form để thêm Step -->
    <h2>Add New Step</h2>
    <div>
        <label for="accept">Actor:</label>
        <select id="accept" bind:value={newStep.actor}>
            <option value="" disabled selected>Choose a user</option>
            {#each users as user}
                <option value={`${user.id}-${user.username}`}>{user.username}</option>
            {/each}
        </select>
        <label for="accept">Accepter:</label>
        <select id="accept" bind:value={newStep.accept}>
            <option value="">Choose a user</option>
            {#each users as user}
                <option value={`${user.id}-${user.username}`}>{user.username}</option>
            {/each}
        </select>

        <label for="reject">Rejecter:</label>
        <select id="reject" bind:value={newStep.reject}>
            <option value="" disabled selected>Choose a user</option>
            {#each users as user}
                <option value={`${user.id}-${user.username}`}>{user.username}</option>
            {/each}
        </select>

        <button on:click={addNewStep}>Add Step</button>
    </div>
</div>
<button on:click={submitSteps}>Submit Steps</button>

