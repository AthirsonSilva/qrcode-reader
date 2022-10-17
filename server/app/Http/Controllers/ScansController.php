<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ScanModel;

class ScansController extends Controller
{
    private $scans;

    public function _construct()
    {
        $this->scans = new ScanModel();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $scans = ScanModel::all();

        return response([
            'scans' => $scans,
            'message' => 'Retrieved successfully'
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $query = $this->scans->create([
            'data' => $request->data,
            'type' => $request->type,
            'name' => $request->name
        ]);

        if ($query) {
            return response()->success('Data saved successfully');
        } else {
            return response()->failed('Data failed to save');
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {

            $query = ScanModel::create([
                'data' => $request->data,
                'type' => $request->type,
                'name' => $request->name
            ]);

            if ($query) {
                return response([
                    'status' => 200,
                    'message' => 'Data saved successfully',
                    'data' => $query . json_encode($request),
                ]);
            } else {

                return response([
                    'status' => 500,
                    'message' => 'Data failed to save',
                    'data' => $query . json_encode($request),
                ]);
            }
        } catch (\Exception $e) {
            if ($e instanceof \Illuminate\Database\QueryException && $e->getCode() == 23000) {
                return response([
                    'status' => 500,
                    'message' => 'O QRCode já existe',
                    'data' => $e->getMessage(),
                ]);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $scans = ScanModel::all();

        return response([
            'scans' => $scans,
            'message' => 'Retrieved successfully'
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        return response([
            'message' => 'LOL'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $actualData = ScanModel::find($id);

        echo $actualData->type;

        if ($request->isMethod('patch')) {
            if ($request->data && !$request->type) {
                $query = ScanModel::where('id', $id)->update([
                    'data' => $request->data,
                    'type' => $actualData->type
                ]);

                return response([
                    'status' => 200,
                    'message' => 'Data updated successfully',
                    'data' => $query . json_encode($request),
                ]);
            } else if ($request->type && !$request->data) {
                $query = ScanModel::where('id', $id)->update([
                    'type' => $request->type,
                    'data' => $actualData->data
                ]);
            } else {
                return response([
                    'status' => 500,
                    'message' => 'Data failed to update',
                    'data' => json_encode($request),
                ]);
            }
            $query = ScanModel::where('id', $id)->update([
                'data' => $request->data,
                'type' => $request->type
            ]);

            return response([
                'status' => 200,
                'message' => 'Data updated successfully',
                'data' => $query . json_encode($request),
            ]);
        } else if ($request->isMethod('put')) {
            $query = ScanModel::where('id', $id)->update([
                'data' => $request->data,
                'type' => $request->type
            ]);

            return response([
                'status' => 200,
                'message' => 'Data updated successfully',
                'data' => $query . json_encode($request),
            ]);
        } else {
            return response([
                'status' => 500,
                'message' => 'Invalid request method',
                'data' => json_encode($request),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // $query = $this->scan->where('id', $id)->delete();
        $query = ScanModel::where('id', $id)->delete();

        if ($query) {
            return response([
                'status' => 200,
                'message' => 'Data deleted successfully',
                'data' => $query,
            ]);
        } else {
            return response([
                'status' => 500,
                'message' => 'Data failed to delete',
                'data' => $query,
            ]);
        }
    }
}
